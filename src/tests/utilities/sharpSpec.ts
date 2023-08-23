import express from 'express';
import httpMocks from 'node-mocks-http';
import fs from 'fs';
import imageResizeMiddleware from '../../utilities/sharp';
import * as isSameSizeModule from '../../utilities/isSameSize';

describe('imageResizeMiddleware', () => {
  it('should return 400 for invalid parameters', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      query: {
        filename: '',
        width: '200',
        height: '200'
      }
    });
    const response = httpMocks.createResponse();
    await imageResizeMiddleware(request, response, () => {});
    expect(response.statusCode).toBe(400);
  });

  it('should process image and save to thumb folder', async () => {
    spyOn(fs, 'existsSync').and.returnValue(true);

    // Giả mạo hàm isSameSize để trả về giá trị false
    spyOn(isSameSizeModule, 'default').and.returnValue(Promise.resolve(false));

    const request = httpMocks.createRequest({
      method: 'GET',
      query: {
        filename: 'fjord',
        width: '200',
        height: '200'
      }
    });
    const response = httpMocks.createResponse();
    await imageResizeMiddleware(request, response, () => {});
    expect(response.statusCode).toBe(200);
  });
});
