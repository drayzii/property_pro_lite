import { v2 as cloudinary } from 'cloudinary';
import jsonwebtoken from 'jsonwebtoken';

import jwtKey from '../config/keys';
import Property from '../model/propertyModel';


cloudinary.config({
  cloud_name: 'drayzii',
  api_key: '684962114961327',
  api_secret: 'nd7rO_KTFnhyfkRXCS4pqzgIyjA',
});


class property {
  static addProperty(req, res) {
    jsonwebtoken.verify(req.token, jwtKey, (err) => {
      if (err) {
        res.status(403).json({
          status: 'failed',
          error: 'Forbidden route',
        });
      } else {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          if (error) {
            res.json({
              status: 'failed',
              error: 'Could not upload image',
            });
          } else {
            const id = Property.length + 1;
            const {
              type, state, city, address, price,
            } = req.body;
            const newProperty = {
              id,
              status: 'Available',
              type,
              state,
              city,
              address,
              price,
              created_on: Date.now,
              image_url: result.url,
            };
            Property[id - 1] = newProperty;
            res.json({
              status: 'success',
              data: newProperty,
            });
          }
        });
      }
    });
  }
  static updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const theProperty = Property.find(oneProperty => oneProperty.id === id);
    if (!theProperty) {
      res.json({
        status: 'error',
        error: 'Could not Update Property',
      });
    } else {
      if (req.files.photo) {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          if (error) {
            res.json({
              status: 'error',
              error: 'Could not upload image',
            });
          } else {
            theProperty.image_url = result.url;
          }
        });
      }
      const {
        type, state, city, address, price,
      } = req.body;
      theProperty.type = type;
      theProperty.state = state;
      theProperty.city = city;
      theProperty.address = address;
      theProperty.price = price;

      res.json({
        status: 'success',
        data: {
          id: theProperty.id,
          status: theProperty.status,
          type: theProperty.type,
          state: theProperty.state,
          city: theProperty.city,
          address: theProperty.address,
          price: theProperty.price,
          image_url: theProperty.image_url,
        },
      });
    }
  }
}

export default property;
