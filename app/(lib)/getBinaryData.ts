export const getBinaryData = async(image:File) => {

  const imageReader = image.stream().getReader();
  const imageDataU8: number[] = [];
  //u8[]

  while (true){

    const {done,value} = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);

  }

  //@ts-ignore
  const imageBinary = Buffer.from(imageDataU8,'binary');
  return imageBinary;

}