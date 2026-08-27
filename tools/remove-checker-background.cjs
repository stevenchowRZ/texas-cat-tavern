const sharp=require('sharp');

const file=process.argv[2];
if(!file)throw new Error('Usage: node remove-checker-background.cjs <image.png>');

(async()=>{
  const image=sharp(file).ensureAlpha();
  const {data,info}=await image.raw().toBuffer({resolveWithObject:true});
  const {width,height}=info,seen=new Uint8Array(width*height),queue=[];
  const isChecker=index=>{
    const offset=index*4,[r,g,b,a]=[data[offset],data[offset+1],data[offset+2],data[offset+3]];
    return a>0&&r>220&&g>220&&b>220&&Math.max(r,g,b)-Math.min(r,g,b)<15;
  };
  const push=index=>{if(!seen[index]&&isChecker(index)){seen[index]=1;queue.push(index)}};
  for(let x=0;x<width;x++){push(x);push((height-1)*width+x)}
  for(let y=1;y<height-1;y++){push(y*width);push(y*width+width-1)}
  for(let cursor=0;cursor<queue.length;cursor++){
    const index=queue[cursor],x=index%width,y=Math.floor(index/width);
    if(x>0)push(index-1);if(x<width-1)push(index+1);if(y>0)push(index-width);if(y<height-1)push(index+width);
  }
  for(const index of queue)data[index*4+3]=0;
  await sharp(data,{raw:{width,height,channels:4}}).png().toFile(`${file}.clean.png`);
  await require('fs').promises.rename(`${file}.clean.png`,file);
})();
