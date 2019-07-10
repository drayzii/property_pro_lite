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
    const theproperty = Property.find(oneProperty => oneProperty.id === id);
    if (!theproperty) {
      res.json({
        status: 'failed',
        error: 'Could not Update Property',
      });
    } else {
      if (req.files.photo) {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          if (error) {
            res.json({
              status: 'failed',
              error: 'Could not upload image',
            });
          } else {
            theproperty.image_url = result.url;
          }
        });
      }
      const {
        type, state, city, address, price,
      } = req.body;
      theproperty.type = type;
      theproperty.state = state;
      theproperty.city = city;
      theproperty.address = address;
      theproperty.price = price;

      res.json({
        status: 'true',
        data: {
          id: theproperty.id,
          status: theproperty.status,
          type: theproperty.type,
          state: theproperty.state,
          city: theproperty.city,
          address: theproperty.address,
          price: theproperty.price,
          image_url: theproperty.image_url,
        },
      });
    }
  }
}

export default property;
