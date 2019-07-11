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
          status: 403,
          error: 'Forbidden route',
        });
      } else {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          if (error) {
            res.status(500).json({
              status: 500,
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
            res.status(201).json({
              status: 201,
              data: newProperty,
            });
          }
        });
      }
    });
  }
  static deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10) - 1;
    if (typeof Property[id] === 'undefined' || Property[id] === null) {
      res.status(404).json({
        status: 404,
        error: 'Property not Found',
      });
    } else {
      delete Property[id];
      res.status(204).json({
        status: 204,
        data: {
          message: 'Property deleted successfully',
        },
      });
    }
  }
  static viewSpecificProperty(req, res) {
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
  static viewAllProperties(req, res) {
    if (req.query.type) {
      const { type } = req.query;
      const typeProperties = Property.filter(theProperties => theProperties.type === type);
      if (!typeProperties) {
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
  static updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const theProperty = Property.find(oneProperty => oneProperty.id === id);
    if (!theProperty) {
      res.status(404).json({
        status: 404,
        error: 'Could not find Property',
      });
    } else {
      if (req.files.photo) {
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
      const {
        type, state, city, address, price,
      } = req.body;
      theProperty.type = type;
      theProperty.state = state;
      theProperty.city = city;
      theProperty.address = address;
      theProperty.price = price;

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
  static markAsSold(req, res) {
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
}


export default property;
