import sharp from "sharp";

function isSameSize(imagePath: string, width: number, height: number): Promise<boolean> {
    const image = sharp(imagePath);
    return image.metadata().then(metadata => {
      return metadata.width === width && metadata.height === height;
    });
}

export default isSameSize;