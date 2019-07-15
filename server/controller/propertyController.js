import { v2 as cloudinary } from 'cloudinary';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

import Property from '../model/propertyModel';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


class property {
  static addProperty(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const id = Property.length + 1;
        const {
          type, state, city, address, price,
        } = req.body;
        if (req.files) {
          if (process.env.NODE_ENV !== 'test') {
            const file = req.files.photo;
            cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
              if (error) {
                res.status(500).json({
                  status: 500,
                  error: 'Could not upload image',
                });
              } else {
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
                Property.push(newProperty);
                res.status(201).json({
                  status: 201,
                  data: newProperty,
                });
              }
            });
          }
        } else {
          const newProperty = {
            id,
            status: 'Available',
            type,
            state,
            city,
            address,
            price,
            created_on: Date.now,
          };
          Property.push(newProperty);
          res.status(201).json({
            status: 201,
            data: newProperty,
          });
        }
      }
    });
  }
  static deleteProperty(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const id = parseInt(req.params.id, 10) - 1;
        if (typeof Property[id] === 'undefined' || Property[id] === null) {
          res.status(404).json({
            status: 404,
            error: 'Property not Found',
          });
        } else {
          delete Property[id];
          res.status(202).json({
            status: 202,
            data: {
              message: 'Property deleted successfully',
            },
          });
        }
      }
    });
  }
  static viewSpecificProperty(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const id = parseInt(req.params.id, 10);
        const oneProperty = Property.find(theProperty => theProperty.id === id);
        if (!oneProperty) {
          res.status(404).json({
            status: 404,
            error: 'Property not Found',
          });
        } else {
          res.status(200).json({
            status: 200,
            data: oneProperty,
          });
        }
      }
    });
  }
  static viewAllProperties(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        if (req.query.type) {
          const { type } = req.query;
          const typeProperties = Property.filter(theProperties => theProperties.type === type);
          if (typeProperties.length === 0) {
            res.status(404).json({
              status: 404,
              error: 'No properties matching the entered type',
            });
          } else {
            res.status(200).json({
              status: 200,
              data: typeProperties,
            });
          }
        } else {
          if (Property.length === 0) {
            res.status(404).json({
              status: 404,
              error: 'No properties to show',
            });
          } else {
            res.status(200).json({
              status: 200,
              data: Property,
            });
          }
        }
      }
    });
  }
  static updateProperty(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const id = parseInt(req.params.id, 10);
        const theProperty = Property.find(oneProperty => oneProperty.id === id);
        if (!theProperty) {
          res.status(404).json({
            status: 404,
            error: 'Could not find Property',
          });
        } else {
          if (req.files) {
            if (process.env.NODE_ENV !== 'test') {
              const file = req.files.photo;
              cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
                if (error) {
                  res.status(500).json({
                    status: 500,
                    error: 'Could not upload image',
                  });
                } else {
                  theProperty.image_url = result.url;
                }
              });
            }
          }
          const {
            type, state, city, address, price,
          } = req.body;
          if (typeof type !== 'undefined') {
            theProperty.type = type;
          }
          if (typeof state !== 'undefined') {
            theProperty.state = state;
          }
          if (typeof city !== 'undefined') {
            theProperty.city = city;
          }
          if (typeof address !== 'undefined') {
            theProperty.address = address;
          }
          if (typeof price !== 'undefined') {
            theProperty.price = price;
          }

          res.status(202).json({
            status: 202,
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
    });
  }
  static markAsSold(req, res) {
    jsonwebtoken.verify(req.token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const id = parseInt(req.params.id, 10);
        const theProperty = Property.find(oneProperty => oneProperty.id === id);
        if (!theProperty) {
          res.status(404).json({
            status: 404,
            error: 'Property not Found',
          });
        } else {
          theProperty.status = 'Sold';
          res.status(202).json({
            status: 202,
            data: theProperty,
          });
        }
      }
    });
  }
}


export default property;
