(()=>{
  const STORAGE_KEY='catGameLanguageV1';
  const exact={
    '德州猫猫酒馆':'Texas Cat Tavern','猫猫酒馆':'Cat Tavern','鸡尾酒吧营业':'COCKTAIL BAR OPEN','进入庄园':'Enter Estate','进入德州扑克':'Enter Texas Hold’em','进入联机对战':'Enter Online Match','《德州扑克》':'TEXAS HOLD’EM','《联机对战》':'ONLINE MATCH',
    '设置':'Settings','声音设置':'Sound Settings','音乐设置':'Music Settings','德州设置':'Poker Settings','酒馆设置':'Tavern Settings','语言':'Language','全局背景音乐':'Global Music','背景音量':'Music Volume','音量':'Music Volume','按键音效':'Button Sounds','音效音量':'SFX Volume','操作说明':'Controls','关闭':'Close','邀请':'Invite',
    '选择你的牌局':'Choose Your Table','选择玩法':'Choose Mode','单人竞标赛':'Solo Tournament','好友联机':'Online With Friends','与猫咪 AI 争夺最终排名':'Compete with cat AIs for first place','创建或加入好友房':'Create or join a private room','当前姓名':'Player Name','选择猫猫头像':'Choose Cat Avatar','牌桌人数':'Players','初始筹码':'Starting Chips','初始盲注':'Starting Blinds','盲注升级':'Blind Increase','不变化':'No Increase','每 5 分钟':'Every 5 Minutes','每 10 分钟':'Every 10 Minutes','每 15 分钟':'Every 15 Minutes','每 30 分钟':'Every 30 Minutes','开始':'START','创建好友房':'Create Friend Room','加入房间':'Join Room','6 位房间码':'6-digit room code','仅供娱乐练习，不含现金与充值功能':'For entertainment only. No cash play or purchases.','选择玩法后设置牌局，随时开桌':'Choose a mode, set the table, and play anytime','完成白天牌桌赛后进入夜晚':'Finish or skip the daytime poker tournament to reach night',
    '当前猫猫币':'Current Cat Coins','猫猫币':'Cat Coins','第 1 天 · 白天':'Day 1 · Daytime','白天':'DAYTIME','夜晚':'NIGHT','白天 · 德州时间':'DAYTIME · POKER TIME','鸡尾酒吧营业中，打烊后才能进入庄园':'The estate is unavailable while the bar is open','酒保工作台':'Bartender Station','请横屏进入猫猫酒馆':'Rotate to Enter the Cat Tavern','旋转手机后即可设置房间和开始游戏':'Rotate your phone to set up a room and start playing','同一 Wi‑Fi / 手机热点':'Same Wi‑Fi / Mobile Hotspot',
    '今晚菜单':'Menu','备货间':'Stock','配方研究':'Recipes','员工招募':'Staff','22:00 开始营业':'OPEN 22:00','开始营业':'Open','提前打烊':'Close Early','开业准备':'Prep',
    '购买':'Buy','库存':'Stock','单价':'Unit Price','售价':'Price','制作':'Making','制作中':'Making','完成':'Ready','已完成':'Completed','已学会':'Learned','解锁':'Unlock','已招募':'Hired','招募':'Hire','当前员工':'Current Staff','尚未招募员工':'No staff hired yet','各项永久加成可以累计。':'Permanent staff bonuses stack.','六名员工各有一项永久加成；全部招募后仍保持合理收益节奏':'Each of the six staff members grants a permanent bonus.','星级越高越热门、小费越多；复杂高价酒制作更慢，客人也有口味偏好':'More stars mean more orders and tips. Premium cocktails take longer, and guests have preferences.','每款酒都有口味、热度与制作时间；每次升级学会一款鸡尾酒':'Each drink has a flavor, popularity, and mixing time. Learn one recipe per level.','每 5 杯提升熟练度；每 15 点热度增加 1 星，最高 5 星':'Mastery every 5 sales · +1 star per 15 Heat · Max 5','口味匹配与 5 秒内送达会额外增加热度；长期零销量会轻微衰减':'Preference and fast service add Heat · Idle drinks slowly cool','新配方研究成功！':'New Recipe Unlocked!','新材料现已可采购':'New ingredients are now available','收下账本':'Close Ledger',
    '售出鸡尾酒':'Drinks Sold','销售收入':'Revenue','客人小费':'Tips','材料成本':'Ingredient Cost','超时离场扣款':'Late Penalties','未售出耗损':'Waste','经营复盘':'Night Review','本晚最佳鸡尾酒':'Best Drink','主要超时原因':'Main Delay','最缺材料':'Low Stock','下晚建议':'Next Tip','暂无售出记录':'No Sales','本晚无客人超时':'No Timeouts','本晚无明显缺料':'Stock OK','毛利率':'Margin','今晚净盈利':'Net Profit',
    '牌力说明':'Hand Guide','从强到弱排列，牌型相同时比较组成牌型的点数，再比较踢脚牌。':'Ranked strongest to weakest. Identical hands compare made-card ranks, then kickers.','同花顺':'Straight Flush','四条':'Four of a Kind','葫芦':'Full House','同花':'Flush','顺子':'Straight','三条':'Three of a Kind','两对':'Two Pair','一对':'One Pair','高牌':'High Card','同一花色的连续五张牌':'Five consecutive cards of one suit','四张相同点数':'Four cards of the same rank','三条加一对':'Three of a kind plus a pair','五张同一花色':'Five cards of one suit','五张连续点数':'Five consecutive ranks','三张相同点数':'Three cards of the same rank','两个不同对子':'Two different pairs','两张相同点数':'Two cards of the same rank','不构成以上牌型':'None of the hands above','A 可在 A-2-3-4-5 中作为最小牌。':'Ace may play low in A-2-3-4-5.','最近 5 局':'Last 5 Hands','暂无已完成牌局':'No completed hands yet','公共牌':'Board','未发公共牌':'No board cards','没有需要展示的手牌':'No hands to reveal',
    '等待玩家加入':'Waiting for Players','把房间码发给同一网络中的好友':'Share the room code with friends on the same network','开始牌局':'Start Game','底池 0':'Pot 0','底池':'Pot','加注到':'Raise To','最小':'Minimum','½ 底池':'½ Pot','全下':'All In','确认加注':'Confirm Raise','弃牌':'Fold','过牌':'Check','加注':'Raise','跟注':'Call','等待':'Wait','轮到你行动':'Your Turn','等待其他玩家…':'Waiting for other players…','立即开始下一手':'Start Next Hand','重新开始':'Restart','本手牌已结束':'Hand Complete','本桌冠军已经产生':'Table Champion Decided','领取奖励并返回酒馆':'Claim Reward & Return','暂无历史':'No History','上一局：你':'Last Hand: You',
    '单人竞标赛 · 支付猫猫币入场，按最终名次结算奖励':'Solo Tournament · Pay Cat Coins to enter and earn rewards by final rank','好友联机 · 设置昵称与头像后，创建或加入房间':'Online With Friends · Set your name and avatar, then create or join a room','空位开局后由 AI 补齐':'Empty seats will be filled by AI','真人选择昵称和头像；开局后空位会由猫咪 AI 补齐。':'Choose a name and avatar. Cat AIs fill empty seats when the game begins.','邀请信息已复制':'Invite copied','请输入 6 位房间码':'Enter a 6-digit room code',
    '确定要中途退出本场单人赛吗？':'Leave this solo tournament early?','已支付的入场费不会退还，本场也不会获得任何奖励。':'Your entry fee will not be refunded, and you will receive no reward.','继续比赛':'Keep Playing','确认退出':'Leave Tournament',
    '键盘':'Keyboard','鼠标':'Mouse','移动':'Move','冲刺':'Sprint','最多 3 秒':'Up to 3 sec','取 / 递酒':'Pick Up / Serve','丢弃':'Discard','点击服务员':'Click the server','操作界面':'Interface','点击霓虹灯、菜单与按钮':'Click neon signs, menus, and buttons','左摇杆 / 十字键':'Left Stick / D-Pad','像素鼠标':'Pixel Cursor','校准光标':'Calibrate Cursor','回到中心':'Center Cursor','酒馆指南':'Tavern Guide','新手指引':'First Night Guide','键盘操作':'Keyboard','XBOX 手柄':'XBOX Controller','完成':'Done','基础操作':'Basic Controls','三步完成上酒':'Serve in 3 Steps','右摇杆 /':'Right Stick /','拿酒或递酒':'Pick Up or Serve','向左移动':'Move Left','向右移动':'Move Right','手机服务员控制':'Mobile Server Controls','← → 移动　空格取酒 / 送酒':'← → Move · Space Pick Up / Serve',
    '猫猫庄园停车场':'Cat Estate Parking','庄园停车位':'Estate Parking Spaces','庄园与车辆测试控制':'Estate and Vehicle Controls',
    '返回酒馆 →':'Return to Tavern →','五级庄园':'Level 5 Estate','金爪宫邸 · 5 个车位':'Golden Paw Palace · 5 Spaces','停车收益':'Parking Income','待领取停车费':'Unclaimed Parking Fees','收取':'Collect','庄园':'Estate','车库':'Garage','购车':'Buy Cars','我的车库':'My Garage','名车展厅':'Car Showroom','庄园图鉴':'Estate Collection','当前庄园':'Current Estate','当前车辆':'Current Vehicle','尚未解锁':'Locked','已解锁':'Unlocked','未解锁预览':'Locked Preview','前往庄园':'Go to Estate','前往车库':'Go to Garage','车辆全部回到车库':'All cars returned to the garage','车库待命':'Ready in Garage','停放中':'Parked','驶回车库':'Return to Garage','选择车辆':'Choose a Car','选择梦想豪宅':'Choose Your Dream Estate','购买成功':'Purchase Complete','购车成功':'Car Purchased','庄园尚未解锁':'Estate Locked','先解锁你的第一座庄园':'Unlock your first estate','猫猫币不足':'Not enough Cat Coins',
    '白天 · 完成一场德州牌桌赛，或直接跳过':'Daytime · Finish a poker tournament or skip','持续进行多手牌，直到路易赢光全桌筹码或输光筹码；《联机对战》不限局数':'Play until Louis wins every chip or loses all chips. Online matches have no hand limit.','跳过白天':'Skip Daytime','请先完成白天德州牌桌赛，或选择跳过白天':'Finish the daytime poker tournament or skip daytime first','已跳过白天 · 夜晚酒吧营业已解锁':'Daytime skipped · Night bar unlocked','路易赢下整桌 · 夜晚酒吧营业已解锁':'Louis won the table · Night bar unlocked','路易筹码归零 · 夜晚酒吧营业已解锁':'Louis lost all chips · Night bar unlocked',
    '正在看菜单':'Reading the Menu','还没有做好的鸡尾酒':'No cocktail is ready','客人还没有坐好点单':'No guest has ordered yet','移动到酒保旁边再按空格取酒':'Move beside the bartender and press Space to pick up','移动到任意一位点了同款酒的客人面前再按空格':'Move to a guest who ordered this drink and press Space','服务员已开启自动托管':'Auto-server enabled','服务员已恢复手动控制':'Manual server control restored','开启自动托管':'Enable Auto-Serve','自动托管中':'Auto-Serving','客人点单':'Guest Order','酒保制作':'Bartender Mixing','取酒与递酒':'Pick Up & Serve','先看客人头顶的鸡尾酒':'Check the cocktail above each guest','观察酒保头顶的制作队列':'Watch the bartender’s mixing queue','移动服务员完成配送':'Move the server to deliver drinks','气泡出现后，酒保会按订单顺序开始制作。':'Once the order bubble appears, the bartender starts drinks in order.','服务员只能先拿最早完成的那一杯。':'The server must take the earliest completed drink first.','5 秒内送达会获得爱心反馈；等待超过 10 秒会产生罚款。':'Serve within 5 seconds for hearts. After 10 seconds, the guest leaves and a penalty applies.','新手营业指南':'Service Guide','第一次营业 · 三步完成上酒':'First Night · Serve in 3 Steps','阅读完三个步骤后开始营业，计时会在关闭引导后启动。':'Service starts after you close this guide.','跳过引导':'Skip Tutorial','上一步':'Back','下一步':'Next','太棒了！':'Great!','营业开始':'Open the Bar',
    '客人坐下后会先看菜单，再显示点单。每位客人只有 10 秒耐心；不同外观的猫猫有不同口味偏好，菜单中的热门酒也更容易被点到。':'Guests read the menu before ordering. Each guest waits 10 seconds; different cats prefer different flavors, and popular drinks are ordered more often.','鸡尾酒图片旁的进度条代表制作进程。高价且配料复杂的酒制作更慢；显示“完成”后会按完成先后竖向排列。':'The bar beside each cocktail shows mixing progress. Premium, complex drinks take longer; completed drinks stack in finish order.','移动到酒保旁取酒，再走到点了同款酒的客人面前递出。键盘使用 ← →、Space；Xbox 使用左摇杆与 A；手机使用屏幕按钮。':'Move to the bartender to pick up, then serve a guest who ordered that drink. Use ← → and Space, Xbox left stick and A, or the mobile controls.','靠近酒保按 Space 拿走最先完成的鸡尾酒；靠近点了同款酒的客人再按一次 Space 递酒。':'Stand by the bartender and press Space to take the first ready drink; stand by a guest with the same order and press Space again to serve it.','冲刺耗尽体力后需要 3 秒完全恢复；普通走路时会持续恢复。':'An empty sprint meter fully recovers in 3 seconds; normal walking restores it continuously.','左摇杆或十字键移动服务员。右摇杆移动黑桃 A 光标，A 键可确认界面按钮，或在酒馆中取酒与递酒。':'Move with the left stick or D-Pad. The right stick moves the Ace of Spades cursor; A confirms buttons or picks up and serves drinks in the tavern.','按 R3 可让光标回到屏幕中心，并自动用卡牌中心校准命中位置。':'Press R3 to center the cursor and calibrate hit detection to the card center.',
    '清爽':'Refreshing','经典':'Classic','热带':'Tropical','蓝调':'Blue','醇厚':'Rich','辛香':'Spicy','酸甜':'Sweet & Sour','基酒':'Base Spirits','利口酒与苦味剂':'Liqueurs & Bitters','调和剂':'Mixers','鲜果与香草':'Fruit & Herbs',
    '金汤力':'Gin & Tonic','莫吉托':'Mojito','黛绮莉':'Daiquiri','玛格丽特':'Margarita','威士忌酸':'Whiskey Sour','古典':'Old Fashioned','尼格罗尼':'Negroni','曼哈顿':'Manhattan','长岛冰茶':'Long Island Iced Tea','宇宙大都会':'Cosmopolitan','莫斯科骡子':'Moscow Mule','血腥玛丽':'Bloody Mary','椰林飘香':'Piña Colada','浓缩咖啡马天尼':'Espresso Martini','阿佩罗橙光':'Aperol Spritz','龙舌兰日出':'Tequila Sunrise','蓝色泻湖':'Blue Lagoon','蓝色夏威夷':'Blue Hawaiian','游泳池':'Swimming Pool','电光柠檬水':'Electric Lemonade','蓝色玛格丽特':'Blue Margarita','水天使':'Aqua Velva','蓝色摩托车':'Blue Motorcycle','蓝色星期一':'Blue Monday',
    '金酒':'Gin','白朗姆':'White Rum','伏特加':'Vodka','波本威士忌':'Bourbon','龙舌兰':'Tequila','黑麦威士忌':'Rye Whiskey','橙味利口酒':'Orange Liqueur','甜味美思':'Sweet Vermouth','金巴利':'Campari','咖啡利口酒':'Coffee Liqueur','芳香苦精':'Aromatic Bitters','蓝橙力娇酒':'Blue Curaçao','阿佩罗':'Aperol','汤力水':'Tonic Water','苏打水':'Soda Water','可乐':'Cola','姜汁啤酒':'Ginger Beer','柠檬汽水':'Lemon Soda','普罗塞克':'Prosecco','糖浆':'Syrup','浓缩咖啡':'Espresso','蔓越莓汁':'Cranberry Juice','番茄汁':'Tomato Juice','菠萝汁':'Pineapple Juice','橙汁':'Orange Juice','椰浆':'Coconut Cream','淡奶油':'Cream','红石榴糖浆':'Grenadine','辣椒汁':'Hot Sauce','伍斯特酱':'Worcestershire','柠檬':'Lemon','青柠':'Lime','薄荷':'Mint','橙片':'Orange Slice','橙皮':'Orange Peel','酒渍樱桃':'Cocktail Cherry','蛋清':'Egg White','海盐':'Sea Salt','盐与黑胡椒':'Salt & Pepper','综合基酒':'Mixed Spirits','开胃酒':'Aperitif',
    '客人小费 +8%':'Guest Tips +8%','营业时间 +6%':'Business Time +6%','酒保制酒速度 +10%':'Mixing Speed +10%','客人到店速度 +8%':'Guest Arrival +8%','服务员移动速度 +10%':'Server Speed +10%','拿酒与送酒速度 +10%':'Serving Speed +10%','笑容招待':'Warm Welcome','夜巡值班':'Night Watch','精准调酒':'Precision Mixing','宾客关系':'Guest Relations','轻步领班':'Swift Captain','律动协作':'Rhythm Teamwork','粉色领结亲切醒目，最会让客人开心。':'Her bright pink bow and warm welcome lift every guest’s mood.','红斗篷适合守住深夜的最后一盏灯。':'His red hood keeps the last light glowing deep into the night.','护目镜让每次量酒和摇制都更准确。':'His goggles make every measure and shake more precise.','花饰温柔亮眼，擅长招呼新客入座。':'Her gentle flowers help new guests feel welcome.','沉稳正装和敏捷身手让送酒路线更顺。':'A sharp suit and quick steps keep deliveries smooth.','小提琴家的节拍感让吧台配合更流畅。':'A violinist’s rhythm keeps the whole bar in sync.',
    '团子':'Tuanzi','麻薯':'Mochi','奶盖':'Cream','芝麻':'Sesame','布丁':'Pudding','栗子':'Chestnut','小满':'Xiaoman','可可':'Cocoa','雪饼':'Snowy','米粒':'Rice','桃酥':'Peach','乌龙':'Oolong','柚子':'Yuzu','豆包':'Bean','月饼':'Mooncake','橘糖':'Orange','桃桃':'Taotao','赤影':'Chiying','阿飞':'Afei','花铃':'Hualing','青禾':'Qinghe','金弦':'Jinxian','路易':'Louis','猫猫玩家':'Cat Player',
    '一级庄园':'Level 1 Estate','二级庄园':'Level 2 Estate','三级庄园':'Level 3 Estate','四级庄园':'Level 4 Estate','温馨小筑':'Cozy Cottage','庭院宅邸':'Garden Residence','喷泉别墅':'Fountain Villa','典藏庄园':'Collector Estate','金爪宫邸':'Golden Paw Palace','丰田 卡罗拉':'Toyota Corolla','宝马 3系GT':'BMW 3 Series GT','丰田 GR Supra':'Toyota GR Supra','宝马 Z4':'BMW Z4','特斯拉 Model Y':'Tesla Model Y','雪佛兰 科迈罗 大黄蜂版':'Chevrolet Camaro Bumblebee','宝马 M4':'BMW M4','宝马 M4 2025':'2025 BMW M4','奥迪 e-tron GT':'Audi e-tron GT','保时捷 911 GT3':'Porsche 911 GT3','特斯拉 Cybertruck':'Tesla Cybertruck','路虎 揽胜':'Range Rover','奔驰 AMG G 63':'Mercedes-AMG G 63','保时捷 Panamera GTS':'Porsche Panamera GTS','宾利 欧陆 GT':'Bentley Continental GT','奔驰 迈巴赫 S 480':'Mercedes-Maybach S 480','法拉利 LaFerrari':'Ferrari LaFerrari','兰博基尼 Revuelto':'Lamborghini Revuelto','劳斯莱斯 幻影':'Rolls-Royce Phantom',
    '制作时间较长':'Slow Mixing','配料不足':'Ingredient Shortage','材料不足':'Not Enough Ingredients','配送不及时':'Late Delivery','订单排队过久':'Long Queue','菜单与库存表现稳定，下晚可以维持当前配置。':'Menu and stock look good. Keep this setup.','成品完成后尽快按队首取酒，并缩短往返路线。':'Take the first ready drink and shorten delivery routes.','减少同时上架的慢速酒，或招募提升制酒速度的员工。':'Offer fewer slow drinks or hire a faster bartender.','精简今晚菜单，让酒保更快处理同类订单。':'Use a smaller menu to clear orders faster.',
    '白天先把杯子擦亮，夜里才会闪闪发光。':'Polish the glasses by day so they sparkle tonight.','我在检查今晚的材料，每一杯都要照真实配方。':'I’m checking tonight’s stock. Every drink follows its proper recipe.','菜单不用贪多，备得齐、做得稳才重要。':'A focused menu, full stock, and steady mixing matter most.','白天可以先去打一局德州。':'You can play a poker tournament during the day.','右边的联机对战，随时可以约朋友。':'Use Online Match to invite friends anytime.','今天也慢慢来，别把好运气催跑了。':'Take it easy today. Don’t rush your luck.','我先熟悉一下吧台的位置。':'I’ll get familiar with the bar layout.','简洁是智慧的灵魂。':'Brevity is the soul of wit.','世事如舞台。':'All the world’s a stage.','爱所有人，信任少数人。':'Love all, trust a few.','客人点什么，我就按订单做什么。':'I’ll mix every drink exactly as ordered.','摇壶响起来，今晚正式开始了。':'The shakers are singing. Tonight has begun.','这杯完成了，记得趁香气还在时送到。':'This one is ready. Serve it while the aroma lasts.','心事可以慢慢说，酒也要慢慢摇。':'Stories can unfold slowly, just like a good shake.','我来取酒，你安心调制。':'I’ll handle delivery. You keep mixing.','同款鸡尾酒可以送给任何点了它的客人。':'A drink can go to any guest who ordered that cocktail.','忙的时候也要记得听客人把话说完。':'Even when it’s busy, let guests finish their stories.','慢一点没关系，今晚还很长。':'It’s okay to slow down. The night is still young.','杯子端稳了，我这就送过去。':'Tray steady. I’m taking it over now.','黑夜再长，白昼总会到来。':'However long the night, the day will come.','勇气在逆境中成长。':'Courage grows with adversity.','真爱之路从不平坦。':'The course of true love never did run smooth.',
    '明明很想他，却不敢发消息。':'I miss him, but I’m afraid to message.','想念可以承认，但别把快乐全交给一条回复。':'You can admit you miss someone, but don’t let one reply hold all your happiness.','我总担心让别人失望。':'I’m always afraid of disappointing people.','照顾别人前，也要给自己的感受留一张凳子。':'Before caring for others, save a seat for your own feelings.','分开以后，还能重新开始吗？':'Can we start again after breaking up?','先问问现在的你们，是否真的学会了好好相爱。':'First ask whether you have both learned to love each other well.','喜欢一个人，为什么这么累？':'Why is loving someone so exhausting?','好的喜欢会有心动，也应该让你感到安心。':'Good love can thrill you, but it should also make you feel safe.','我好像总是不够好。':'I never feel good enough.','你不必完美，真诚地长成自己就已经很珍贵。':'You don’t need to be perfect. Growing honestly into yourself is precious.','朋友渐渐疏远，是我的错吗？':'My friend is drifting away. Is it my fault?','有些同行会走散，不代表一起走过的路是假的。':'Some companions drift apart; that doesn’t make the road you shared unreal.','要怎样才能放下过去？':'How do I let go of the past?','不必催自己忘记，先把今天过得柔软一点。':'Don’t force yourself to forget. Be gentler with today.','我不知道该不该表白。':'I don’t know whether to confess.','如果答案能让你向前，就坦诚又尊重地说出来。':'If the answer helps you move forward, speak honestly and respectfully.',
    '入场费':'Admission price','可获得奖励：':'Bounty:','本次奖励':'Bounty','开　　始':'Start','开始':'Start','本晚经营复盘':'Night Review','材料成本按本晚实际耗用的采购价计算':'Based on ingredients used tonight','关闭结算':'Close','至少选择一款今晚菜单':'Choose at least one drink','营业期间不能办理员工招募':'Staff is unavailable while open','先研究对应配方，才能采购这项材料':'Learn its recipe first','酒保正在摇酒':'Mixing','短缺材料':'Low Stock','当前牌力':'Hand Strength','其他玩家':'Other Players','本局德州扑克结束 · 返回猫猫酒馆':'Poker finished · Return to Tavern','02:00 打烊 · 正在等候最后的客人离场':'02:00 Closing · Waiting for the last guest','← 到头进庄园　→ 到头进德州':'← Estate · Poker →','← 到头进庄园　→ 移动路易':'← Estate · Move Louis →','已退出单人赛：入场费不退还，且不发放奖励':'Tournament left. No refund or bounty.','开局后空位会由猫咪 AI 补齐。':'Cat AIs fill empty seats.','猫猫币不够，去德州牌局赢一些吧！':'Not enough Cat Coins. Win more at poker!','不同外观的猫猫有不同口味偏好，菜单中的热门酒也更容易被点到。':'Each cat has favorite flavors, and popular drinks get more orders.','复杂高价酒制作更慢，客人也有口味偏好':'Premium drinks take longer; guests have flavor preferences.','星级越高越热门、小费越多':'More stars mean more orders and tips.','每款酒都有口味、热度与制作时间':'Each drink has a flavor, rating, and mix time.','每次升级学会一款鸡尾酒':'Unlock one drink per level.','每升 5 级解锁一款鸡尾酒':'New drink every 5 levels.','六名员工各有一项永久加成':'Six cats offer permanent bonuses.','全部招募后仍保持合理收益节奏':'All bonuses stay balanced.',
    '← → 移动；空格取酒 / 送酒；Q 丢弃手中鸡尾酒。':'← → Move · Space Serve · Q Discard','夜晚 21:30 · 开业准备':'Night 21:30 · Prep','收尾中':'Closing','位客人离场':' guests left','分钟升级':' min level up','分钟后升级':' min to level up','想喝':'Wants','点单：':'Order:','调制并上酒':'Serve','材料不足':'No Stock','采购':'Buy','用猫猫币备货。每一份材料可调一杯酒。':'Buy ingredients with Cat Coins.','先采购材料，再根据客人点单调酒。':'Buy ingredients, then fill orders.','像寿司店一样抓住客人的节奏：按订单调酒，越快越有小费。':'Fill orders fast to earn more tips.','月光金酒':'Moonlight Gin','气泡水':'Soda','莓果汁':'Berry Juice','猫爪咖啡':'Paw Coffee','月光喵妮':'Moonlight Meowtini','暖爪摩卡':'Warm Paw Mocha','清爽微醺，适合牌局后':'Light and refreshing.','酸甜闪亮，最受夜猫欢迎':'Sweet, tart, and sparkling.','浓郁又治愈的招牌热饮':'A rich house favorite.',
    '静谧小院，适合开始第一份停车事业。':'A quiet yard for your first parking business.','拥有双车位的花园宅邸，收益空间翻倍。':'A garden home with two income spaces.','喷泉与灯光环绕，为三辆爱车预留席位。':'A fountain villa with room for three cars.','双翼车库与典藏庭园，容纳四台珍藏座驾。':'A collector estate with four garage spaces.','金爪宫邸的五连车位，是顶级车主的终点。':'Five premium spaces for the ultimate collection.','按价格分为 A–D 级 · 同级由高到低':'Class A–D · Highest price first','A级 · 顶级典藏':'Class A · Elite','B级 · 豪华座驾':'Class B · Luxury','C级 · 性能座驾':'Class C · Performance','D级 · 入门收藏':'Class D · Starter','豪华车库':'Garage','车辆已入库':'Car Added','NEW CAR · 车辆已入库':'NEW CAR · ADDED','车辆编号':'Vehicle No.','车库中的':'Garage: ','已经停放的车辆会标出所在车位。':'Parked cars show their space.','请先将该车辆驶回车库':'Return this car to the garage first','先驶回车库':'Return to Garage','当前停放':'Parked','空':'Empty','车位':'Space','家用轿车':'Sedan','精品小车':'Compact','性能轿跑':'Sport Coupe','电动 SUV':'Electric SUV','电动皮卡':'Electric Truck','豪华 SUV':'Luxury SUV','豪华轿车':'Luxury Sedan','超级跑车':'Supercar','珍珠白':'Pearl White','石墨灰':'Graphite','曜石黑':'Obsidian','金属银':'Metallic Silver','不锈钢银灰':'Stainless Silver','亮黄色':'Bright Yellow','大黄蜂黄':'Bumblebee Yellow','敞篷蓝':'Roadster Blue','法拉利红':'Ferrari Red','荧光绿':'Neon Green','奔驰 迈巴赫':'Mercedes-Maybach',
    '德州扑克':'Texas Hold’em','联机对战':'Online','返回酒馆':'Return to Tavern','不限局数':'No hand limit','柑橘伏特加':'Citrus Vodka','等待点单的猫咪客人':'Waiting Guests','空格取酒 / 送酒':'Space: Pick Up / Serve','拿':'PICK','递':'SERVE','购买1份':'Buy 1','出售 ·':'Sell ·','停放':'Park','小费 +':'Tip +','橘子猫阿橘':'Orange','奶牛猫豆花':'Tofu','黑猫小夜':'Midnight','呼噜气泡':'Purr','德州胜利！获得':'Poker Win! +','上酒成功！赚到':'Served! +','避免热门订单被迫改选。':'Avoid forced menu substitutions.','表现最好，下晚可继续主推并备足相关材料。':'Top seller. Keep it featured and stocked.','优先补充':'Restock ','真人选择昵称和头像':'Choose your name and avatar.'
  };

  const replacements={
    '猫猫币':'Cat Coins','房间号：':'Room: ','房间 ':'Room ','盲注 ':'Blinds ','底池 ':'Pot ','跟注 ':'Call ','售价 ':'Price ','单价 ':'Unit Price ','库存 ':'Stock ','招募 · ':'Hire · ','采购 ':'Buy ','购买1份':'Buy 1 ','已加入 ':'Joined ','位客人':' guests','制作 ':'Mixing ','热门小费 +':'Popularity Tip +','熟练度 ':'Mastery ','累计售出 ':'Sold ','热度 ':'Heat ','热门 ':'Rating ','口味偏好加成':'Preference Bonus','今晚净盈利 ':'Net Profit ','打烊 · 净盈利 ':'Closed · Net ','剩余 ':'Left ','次用量':' uses','影响 ':'Affected ','次选择':' choices','每小时 +':'+','小时':'hr','停车费 +':'Parking +','辆停放中':' parked','辆在车库':' in garage','个车位':' spaces','已拥有 ':'Owned: ','解锁庄园 · ':'Unlock · ','出售 · ':'Sell · ','停放 ':'Park ','停入 ':'Park in ','已停入 ':'Parked in ','已驶回车库':'Returned to garage','已售出，获得 ':'Sold for ','展厅购入 ':'Bought: ','赢得':' wins ','你 ':'You ','获得 ':'Received ','入场费 ':'Admission price ','可获得奖励：':'Bounty: ','本次奖励 ':'Bounty ','已支付 ':'Paid ','猫猫币不足，需要 ':'Need ','猫猫币不足，还差 ':'Need ','点单：':'Order: ','离开 · 扣除 ':'Left · −','送给第 ':'Served stool ','拿到最先完成的 ':'Picked up ','目前没有客人点 ':'No guest ordered ','已丢弃 ':'Discarded ','今晚已送出 ':'Served ','采购了 ':'Bought ','售出 ':'Sold '
  };

  const patterns=[
    [/^开\s*始$/,'Start'],
    [/^(\d+)级$/,'Level $1'],
    [/^([A-D])级\s*·\s*顶级典藏$/,'Class $1 · Elite'],
    [/^([A-D])级\s*·\s*豪华座驾$/,'Class $1 · Luxury'],
    [/^([A-D])级\s*·\s*性能座驾$/,'Class $1 · Performance'],
    [/^([A-D])级\s*·\s*入门收藏$/,'Class $1 · Starter'],
    [/^第\s*(\d+)\s*名\s*(.*)$/,'#$1 $2'],
    [/^入场费\s*(.+)$/,'Admission price $1'],
    [/^可获得奖励：\s*(.*)$/,'Bounty: $1'],
    [/^已支付\s*(\d+)\s*猫猫币入场费$/,'Admission paid: $1 Cat Coins'],
    [/^购买1份(.+)$/,'Buy 1 $1'],
    [/^拿到最先完成的\s*(.+)$/,'Picked up $1'],
    [/^([\d,]+)\s*杯$/,'$1'],
    [/^第\s*(\d+)\s*天\s*·\s*白天$/,'Day $1 · Daytime'],
    [/^第\s*(\d+)\s*天\s*·\s*夜晚$/,'Day $1 · Night'],
    [/^第\s*(\d+)\s*天\s*·\s*夜晚营业结算$/,'Day $1 · Nightly Settlement'],
    [/^第\s*(\d+)\s*天\s*·\s*白天\s*·.*$/,'Day $1 · Poker or Skip'],
    [/^第\s*(\d+)\s*天\s*·\s*夜晚\s*21:30\s*·\s*开业准备$/,'Day $1 · Night 21:30 · Prep'],
    [/^02:00\s*·\s*收尾中\s*·\s*等待\s*(\d+)\s*位客人离场$/,'02:00 · Closing · $1 guests left'],
    [/^(\d{2}:\d{2})\s*·\s*剩余\s*(\d+)s$/,'$1 · $2s left'],
    [/^今晚已送出\s*(\d+)\s*杯$/,'Served $1'],
    [/^第\s*(\d+)\s*局$/,'Hand $1'],
    [/^(\d+)\s*秒后自动开始下一手$/,'Next hand starts in $1s'],
    [/^单人赛结算\s*·\s*第\s*(\d+)\s*名$/,'Solo Results · Place $1'],
    [/^已加入\s*(\d+)\/(\d+)，空位开局后由 AI 补齐$/,'Joined $1/$2 · AI fills empty seats'],
    [/^房间号：(.+?)　(\d+)\/(\d+)人$/,'Room: $1　$2/$3 Players'],
    [/^房间\s*(\d+)\s*·\s*(.+?)\s*·\s*(\d+)\/(\d+)人$/,'Room $1 · $2 · $3/$4 Players'],
    [/^房间\s*(\d+)\s*·\s*(.+)$/,'Room $1 · $2'],
    [/^库存\s*(\d+)$/,'Stock $1'],
    [/^单价\s*(\d+)$/,'Unit Price $1'],
    [/^售价\s*(\d+)(.*)$/,'Price $1$2'],
    [/^Lv\.(\d+)\s*解锁$/,'Unlock at Lv.$1'],
    [/^第\s*(\d+)\s*号凳客人\s*\+(\d+)$/,'Stool $1 Guest +$2'],
    [/^今晚已送出\s*(\d+)\s*杯$/,'Served Tonight: $1'],
    [/^剩余\s*(\d+)\s*秒$/,'$1s Remaining'],
    [/^收尾中\s*·\s*等待\s*(\d+)\s*位客人离场$/,'Closing · Waiting for $1 guests'],
    [/^打烊\s*·\s*正在等候最后的客人离场$/,'Closing · Waiting for the last guest'],
    [/^(\d+)\s*人$/,'$1 Players'],
    [/^猫咪头像\s*(\d+)$/,'Cat Avatar $1'],
    [/^五级猫猫庄园与门前五个车位$/,'Level 5 Cat Estate with five parking spaces'],
    [/^(\d+)\s*辆可用\s*\/\s*(\d+)\s*辆$/,'$1 Available / $2'],
    [/^已拥有\s*(\d+)\s*辆豪车$/,'$1 Cars Owned'],
    [/^(\d+)\s*辆车辆待命$/,'$1 Cars Ready'],
    [/^(\d+)\s*辆$/,'$1 Cars'],
    [/^(\d+)\s*辆收藏\s*·\s*A–D\s*价格分级$/,'$1 Cars · Class A–D'],
    [/^展厅购入\s*(\d+)\s*辆\s*·\s*(\d+)\s*辆停放中$/,'$1 Bought · $2 Parked'],
    [/^(.+)像素场景与门前(\d+)个车位$/,'$1 · $2 Parking Spaces'],
    [/^(.+)\s*·\s*(\d+)车位$/,'$1 · $2 Spaces'],
    [/^已切换至(.+)，车辆全部回到车库$/,'Switched to $1 · Cars returned'],
    [/^P(\d+)\s*停放中$/,'P$1 Parked'],
    [/^停入\s*P(\d+)$/,'Park in P$1'],
    [/^(.+)\s*·\s*每小时\s*\+(.+)\s*猫猫币$/,'$1 · +$2 Cat Coins/hr'],
    [/^停车收益\s*·\s*(.+)\s*\/\s*小时$/,'Income · $1/hr'],
    [/^为\s*P(\d+)\s*选择车辆$/,'Choose Car for P$1'],
    [/^(.+)\s*已加入车库$/,'$1 Added to Garage'],
    [/^(.+)\s*已停入\s*P(\d+)$/,'$1 Parked in P$2'],
    [/^(.+)\s*已售出，获得\s*(.+)\s*猫猫币$/,'$1 Sold · +$2 Cat Coins'],
    [/^停车费\s*\+(.+)\s*猫猫币$/,'Parking +$1 Cat Coins'],
    [/^车库中的\s*(\d+)\s*辆车全部显示；已经停放的车辆会标出所在车位。$/,'All $1 cars shown · Parked cars show their space'],
    [/^加入我的德州猫猫酒馆：(.+)，房间码\s*(\d+)$/,'Join my Texas Cat Tavern: $1 · Room $2'],
    [/^(.+)\s+以(.+)赢得(.+)\s+([\d,]+)$/,'$1 wins $4 with $2 · $3'],
    [/^(.+)尚未解锁$/,'$1 Locked'],
    [/^(.+)\s*已解锁$/,'$1 Unlocked'],
    [/^猫猫币不足，需要\s*(.+)$/,'Need $1'],
    [/^猫猫币不足，还差\s*(.+)\s*猫猫币$/,'Need $1 Cat Coins'],
    [/^(.+)\s*已加入酒馆\s*·\s*(.+)$/,'$1 joined · $2'],
    [/^(.+)\s*因(.+)离开\s*·\s*扣除\s*(.+)$/,'$1 left: $2 · −$3'],
    [/^送给第\s*(\d+)\s*号凳客人\s*\+(.+)$/,'Stool $1 served · +$2'],
    [/^02:00\s*打烊\s*·\s*净盈利\s*(.+)$/,'02:00 Closed · Net $1']
  ];
  const exactFragments=Object.entries(exact).filter(([from])=>from.length>1).sort((a,b)=>b[0].length-a[0].length);
  const replacementFragments=Object.entries(replacements).sort((a,b)=>b[0].length-a[0].length);

  let language=localStorage.getItem(STORAGE_KEY)==='en'?'en':'zh';
  let applying=false;
  const textRecords=new WeakMap();
  const attrRecords=new WeakMap();
  const attrs=['aria-label','placeholder','title','alt'];

  function translate(source){
    if(!source||language!=='en')return source;
    const match=source.match(/^(\s*)([\s\S]*?)(\s*)$/),lead=match?.[1]||'',core=match?.[2]||source,tail=match?.[3]||'';
    if(!core)return source;
    let value=exact[core];
    if(value===undefined){
      value=core;
      for(const [pattern,replacement] of patterns){if(pattern.test(value)){value=value.replace(pattern,replacement);break}}
    }
    if(/[\u3400-\u9fff]/.test(value)){
      for(const [from,to] of exactFragments){if(value.includes(from))value=value.split(from).join(to)}
      for(const [from,to] of replacementFragments){if(value.includes(from))value=value.split(from).join(to)}
    }
    return lead+value+tail;
  }

  function skipped(node){return node?.parentElement?.closest('[data-i18n-skip],script,style,textarea')}
  function syncText(node,force=false){
    if(skipped(node))return;
    let record=textRecords.get(node);
    if(!record||(!force&&node.data!==record.last))record={source:node.data,last:node.data};
    const next=language==='en'?translate(record.source):record.source;
    record.last=next;textRecords.set(node,record);
    if(node.data!==next)node.data=next;
  }
  function syncAttrs(element,force=false){
    if(element.closest?.('[data-i18n-skip]'))return;
    let records=attrRecords.get(element)||{};
    attrs.forEach(attr=>{
      if(!element.hasAttribute?.(attr))return;
      let record=records[attr],current=element.getAttribute(attr);
      if(!record||(!force&&current!==record.last))record={source:current,last:current};
      const next=language==='en'?translate(record.source):record.source;
      record.last=next;records[attr]=record;
      if(current!==next)element.setAttribute(attr,next);
    });
    attrRecords.set(element,records);
  }
  function scan(root=document,force=false){
    applying=true;
    if(root.nodeType===Node.TEXT_NODE)syncText(root,force);
    else{
      if(root.nodeType===Node.ELEMENT_NODE)syncAttrs(root,force);
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      while(walker.nextNode())syncText(walker.currentNode,force);
      root.querySelectorAll?.('*').forEach(element=>syncAttrs(element,force));
    }
    applying=false;
  }
  function syncSelectors(){
    document.querySelectorAll('[data-language-select]').forEach(select=>select.value=language);
    document.querySelectorAll('[data-language-choice] [data-language]').forEach(button=>{const active=button.dataset.language===language;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  }
  function setLanguage(next){
    next=next==='en'?'en':'zh';
    if(language===next){syncSelectors();return}
    language=next;localStorage.setItem(STORAGE_KEY,language);
    document.documentElement.lang=language==='en'?'en':'zh-CN';
    document.title=language==='en'?'Texas Cat Tavern':'德州猫猫酒馆';
    scan(document,true);syncSelectors();
    window.dispatchEvent(new CustomEvent('cat-language-change',{detail:{language}}));
  }
  function bind(){
    document.documentElement.lang=language==='en'?'en':'zh-CN';
    document.title=language==='en'?'Texas Cat Tavern':'德州猫猫酒馆';
    document.querySelectorAll('[data-language-select]').forEach(select=>select.addEventListener('change',event=>setLanguage(event.target.value)));
    document.querySelectorAll('[data-language-choice] [data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
    scan(document,true);syncSelectors();
    new MutationObserver(mutations=>{
      if(applying)return;
      mutations.forEach(mutation=>{
        if(mutation.type==='characterData')syncText(mutation.target);
        else if(mutation.type==='attributes')syncAttrs(mutation.target);
        else mutation.addedNodes.forEach(node=>scan(node));
      });
    }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrs});
  }
  window.CatI18n={get language(){return language},setLanguage,translate};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
