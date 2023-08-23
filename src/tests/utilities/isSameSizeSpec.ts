import sharp from 'sharp';
import isSameSize from '../../utilities/isSameSize';

describe('isSameSize function', () => {
  it('should return true for an image with the same size', async () => {
    const imagePath = '../../../images/encenadaport.jpg'; // Thay đổi đường dẫn đến ảnh của bạn
    const expectedWidth = 200;
    const expectedHeight = 200;

    spyOn(sharp.prototype, 'metadata').and.returnValue(
      Promise.resolve({ width: expectedWidth, height: expectedHeight })
    );

    const result = await isSameSize(imagePath, expectedWidth, expectedHeight);
    expect(result).toBe(true);
  });

  it('should return false for an image with different size', async () => {
    const imagePath = '../../../images/encenadaport.jpg'; // Thay đổi đường dẫn đến ảnh của bạn
    const expectedWidth = 200;
    const expectedHeight = 200;

    spyOn(sharp.prototype, 'metadata').and.returnValue(
      Promise.resolve({ width: expectedWidth + 1, height: expectedHeight })
    );

    const result = await isSameSize(imagePath, expectedWidth, expectedHeight);
    expect(result).toBe(false);
  });
});
