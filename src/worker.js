import gameEngine from '../game-engine.js';

const { PokerGame } = gameEngine;
const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function errorResponse(error, status = 400) {
  return json({ error: error?.message || '请求失败' }, status);
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * Math.max(1, max - min));
}

function makeId() {
  return crypto.randomUUID().replaceAll('-', '');
}

function makeRoomCode() {
  return String(randomInt(100000, 1000000));
}

function serializeGame(game) {
  const data = {};
  for (const [key, value] of Object.entries(game)) {
    data[key] = value instanceof Map
      ? { __pokerMap: true, entries: [...value.entries()] }
      : value;
  }
  return data;
}

function reviveGame(data) {
  const game = Object.create(PokerGame.prototype);
  for (const [key, value] of Object.entries(data || {})) {
    game[key] = value?.__pokerMap ? new Map(value.entries || []) : value;
  }
  return game;
}

function serializeRoom(room) {
  return {
    ...room,
    game: serializeGame(room.game),
    tokens: [...room.tokens.entries()],
  };
}

function reviveRoom(room) {
  return {
    ...room,
    game: reviveGame(room.game),
    tokens: new Map(room.tokens || []),
  };
}

function addBot(room, count) {
  const names = ['小北', '阿岚', '老K', '米娅', '七仔', '凯文', '安娜', '乔伊', '山姆'];
  for (let index = 0; index < count; index += 1) {
    const botIndex = room.game.players.filter(player => player.isBot).length;
    room.game.addPlayer({
      id: makeId(),
      name: names[botIndex] || `电脑${index + 1}`,
      isBot: true,
      avatar: randomInt(1, 7),
    });
  }
}

function findPlayer(room, token) {
  if (!room) throw new Error('房间不存在');
  const player = room.tokens.get(token);
  if (!player) throw new Error('身份已失效，请重新加入');
  return player;
}

export class PokerRoom {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.room = null;
    ctx.blockConcurrencyWhile(async () => {
      const stored = await ctx.storage.get('room');
      if (stored) this.room = reviveRoom(stored);
    });
  }

  async save() {
    if (this.room) await this.ctx.storage.put('room', serializeRoom(this.room));
  }

  canContinue() {
    const room = this.room;
    if (!room) return false;
    const live = room.game.players.filter(player => player.chips > 0);
    if (live.length <= 1) return false;
    if (!room.solo) return true;
    const human = room.game.players.find(player => !player.isBot);
    return Boolean(human && human.chips > 0);
  }

  syncTimers(now = Date.now()) {
    const room = this.room;
    if (!room) return false;
    let changed = false;
    if (room.game.status === 'finished') {
      if (room.botActionAt != null) {
        room.botActionAt = null;
        changed = true;
      }
      if (this.canContinue() && room.nextHandAt == null) {
        room.nextHandAt = now + 6000;
        changed = true;
      }
      if (!this.canContinue() && room.nextHandAt != null) {
        room.nextHandAt = null;
        changed = true;
      }
      return changed;
    }

    if (room.nextHandAt != null) {
      room.nextHandAt = null;
      changed = true;
    }
    const current = room.game.status === 'playing' && room.game.turn >= 0
      ? room.game.players[room.game.turn]
      : null;
    if (current?.isBot) {
      if (room.botActionAt == null) {
        room.botActionAt = now + randomInt(1000, 2001);
        changed = true;
      }
    } else if (room.botActionAt != null) {
      room.botActionAt = null;
      changed = true;
    }
    return changed;
  }

  performBotAction() {
    const room = this.room;
    const player = room?.game.players[room.game.turn];
    if (!player?.isBot || room.game.status !== 'playing') return false;
    const legal = room.game.legal(player.id);
    if (!legal) return false;
    let type = legal.check ? 'check' : 'call';
    let amount = 0;
    const strength = Math.random();
    if (legal.raise && strength > 0.78) {
      type = 'raise';
      amount = Math.min(
        legal.maxRaiseTo,
        legal.minRaiseTo + room.game.bigBlind * randomInt(0, 4),
      );
    } else if (legal.fold && strength < 0.16) {
      type = 'fold';
    }
    room.game.action(player.id, type, amount);
    room.botActionAt = null;
    return true;
  }

  async tick(now = Date.now()) {
    if (!this.room) return;
    let changed = this.syncTimers(now);
    for (let guard = 0; guard < 20; guard += 1) {
      if (
        this.room.game.status === 'finished' &&
        this.room.nextHandAt != null &&
        this.room.nextHandAt <= now &&
        this.canContinue()
      ) {
        this.room.nextHandAt = null;
        this.room.game.startHand();
        changed = true;
        changed = this.syncTimers(now) || changed;
        continue;
      }
      if (
        this.room.game.status === 'playing' &&
        this.room.botActionAt != null &&
        this.room.botActionAt <= now
      ) {
        changed = this.performBotAction() || changed;
        changed = this.syncTimers(now) || changed;
        continue;
      }
      break;
    }
    if (changed) await this.save();
  }

  async create(request) {
    if (this.room) return errorResponse(new Error('房间号码冲突，请重试'), 409);
    const body = await request.json();
    const targetSeats = Math.max(2, Math.min(10, Number(body.targetSeats) || 4));
    const game = new PokerGame({
      ...(body.settings || {}),
      initialChips: Math.max(500, Math.min(1000000, Number(body.initialChips) || 5000)),
    });
    game.addPlayer({ id: body.playerId, name: body.name, avatar: body.avatar });
    const solo = body.mode === 'solo';
    this.room = {
      code: body.roomCode,
      game,
      targetSeats,
      owner: body.playerId,
      tokens: new Map([[body.token, body.playerId]]),
      created: Date.now(),
      solo,
      nextHandAt: null,
      botActionAt: null,
    };
    if (solo) {
      addBot(this.room, targetSeats - 1);
      game.startHand();
      this.syncTimers();
    }
    await this.save();
    return json({ room: body.roomCode, token: body.token, playerId: body.playerId });
  }

  async join(request) {
    if (!this.room) throw new Error('找不到这个房间');
    if (this.room.game.players.length >= this.room.targetSeats) throw new Error('房间人数已满');
    const body = await request.json();
    const token = makeId();
    const playerId = makeId();
    this.room.game.addPlayer({ id: playerId, name: body.name, avatar: body.avatar });
    this.room.tokens.set(token, playerId);
    await this.save();
    return json({ room: this.room.code, token, playerId });
  }

  async state(url) {
    await this.tick();
    const playerId = findPlayer(this.room, url.searchParams.get('token'));
    const live = this.room.game.players.filter(player => player.chips > 0).length;
    return json({
      ...this.room.game.view(playerId, this.room.code),
      targetSeats: this.room.targetSeats,
      isOwner: this.room.owner === playerId,
      nextHandAt: this.room.nextHandAt || null,
      tournamentFinished: this.room.game.status === 'finished' && live <= 1,
    });
  }

  async start(request) {
    await this.tick();
    const body = await request.json();
    const playerId = findPlayer(this.room, body.token);
    const live = this.room.game.players.filter(player => player.chips > 0).length;
    if (this.room.game.status === 'finished') {
      this.room.nextHandAt = null;
      this.room.botActionAt = null;
      if (live <= 1) this.room.game.resetTournament();
      this.room.game.startHand();
      this.syncTimers();
      await this.save();
      return json({ ok: true, restarted: live <= 1 });
    }
    if (this.room.owner !== playerId) throw new Error('只有房主可以开始牌局');
    if (this.room.game.status !== 'waiting') throw new Error('牌局已经开始');
    if (this.room.game.players.length < this.room.targetSeats) {
      addBot(this.room, this.room.targetSeats - this.room.game.players.length);
    }
    this.room.game.startHand();
    this.syncTimers();
    await this.save();
    return json({ ok: true });
  }

  async action(request) {
    await this.tick();
    const body = await request.json();
    const playerId = findPlayer(this.room, body.token);
    this.room.game.action(playerId, body.type, body.amount);
    this.syncTimers();
    await this.save();
    return json({ ok: true });
  }

  async fetch(request) {
    try {
      const url = new URL(request.url);
      if (request.method === 'POST' && url.pathname === '/__create') return await this.create(request);
      if (request.method === 'POST' && /\/join$/.test(url.pathname)) return await this.join(request);
      if (request.method === 'GET' && /^\/api\/rooms\/\d{6}$/.test(url.pathname)) return await this.state(url);
      if (request.method === 'POST' && /\/start$/.test(url.pathname)) return await this.start(request);
      if (request.method === 'POST' && /\/action$/.test(url.pathname)) return await this.action(request);
      return errorResponse(new Error('接口不存在'), 404);
    } catch (error) {
      return errorResponse(error);
    }
  }
}

async function createRoom(request, env) {
  const input = await request.json();
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const roomCode = makeRoomCode();
    const token = makeId();
    const playerId = makeId();
    const id = env.POKER_ROOMS.idFromName(roomCode);
    const stub = env.POKER_ROOMS.get(id);
    const response = await stub.fetch(new Request('https://room.internal/__create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, roomCode, token, playerId }),
    }));
    if (response.status !== 409) return response;
  }
  throw new Error('暂时无法生成房间号，请重试');
}

async function routeRoom(request, env, roomCode) {
  const id = env.POKER_ROOMS.idFromName(roomCode);
  return env.POKER_ROOMS.get(id).fetch(request);
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (request.method === 'POST' && url.pathname === '/api/rooms') {
        return await createRoom(request, env);
      }
      const match = url.pathname.match(/^\/api\/rooms\/(\d{6})(?:\/(?:join|start|action))?$/);
      if (match) return await routeRoom(request, env, match[1]);
      if (url.pathname.startsWith('/api/')) return errorResponse(new Error('接口不存在'), 404);
      return env.ASSETS.fetch(request);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
