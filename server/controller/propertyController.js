import uploadImage from '../helpers/cloudinary';
import schema from '../schema/schema';


class property {
  static async addProperty(req, res) {
    const {
      type, state, city, address, price,
    } = req.body;
    let image;
    if (req.files) {
      if (process.env.NODE_ENV !== 'test') {
        const file = req.files.photo;
        image = await uploadImage(file.tempFilePath);
        if (!image) {
          res.status(500).json({
            status: 500,
            error: 'Could not upload image',
          });
        } else {
          const addedProperty = await schema.addProperty([
            req.user.id,
            price,
            state,
            city,
            address,
            type,
            image.url,
          ], true);
          if (addedProperty) {
            res.status(201).json({
              status: 201,
              data: {
                id: addedProperty.id,
                status: addedProperty.status,
                type: addedProperty.type,
                state: addedProperty.state,
                city: addedProperty.city,
                address: addedProperty.address,
                price: addedProperty.price,
                created_on: addedProperty.createdon,
                image_url: addedProperty.image_url,
              },
            });
          }
        }
      } 
    } else {
      const addedProperty = await schema.addProperty([
        req.user.id,
        price,
        state,
        city,
        address,
        type,
      ], false);
      if (addedProperty) {
        res.status(201).json({
          status: 201,
          data: {
            id: addedProperty.id,
            status: addedProperty.status,
            type: addedProperty.type,
            state: addedProperty.state,
            city: addedProperty.city,
            address: addedProperty.address,
            price: addedProperty.price,
            created_on: addedProperty.createdon,
          },
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'Error adding the property',
        });
      }
    }
  }

  static async updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      type, state, city, address, price,
    } = req.body;
    let image;
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      res.status(404).json({
        status: 404,
        error: 'Property not found',
      });
    } else {
      if (propertyInfo.owner !== req.user.id) {
        res.status(403).json({
          status: 403,
          error: 'You can not edit this property',
        });
      } else {
        if (req.files) {
          if (process.env.NODE_ENV !== 'test') {
            const file = req.files.photo;
            image = await uploadImage(file.tempFilePath);
            if (!image) {
              res.status(500).json({
                status: 500,
                error: 'Could not upload image',
              });
            } else {
              const updatedProperty = await schema.updateProperty([
                price,
                state,
                city,
                address,
                type,
                image.url,
                id,
              ], true);
              if (updatedProperty) {
                res.status(202).json({
                  status: 202,
                  data: {
                    id: updatedProperty.id,
                    status: updatedProperty.status,
                    type: updatedProperty.type,
                    state: updatedProperty.state,
                    city: updatedProperty.city,
                    address: updatedProperty.address,
                    price: updatedProperty.price,
                    created_on: updatedProperty.createdOn,
                    image_url: updatedProperty.image_url,
                  },
                });
              } else {
                res.status(500).json({
                  status: 500,
                  error: 'Error updating the property',
                });
              }
            } 
          } 
        } else {
          const updatedProperty = await schema.updateProperty([
            price,
            state,
            city,
            address,
            type,
            id,
          ], false);
          if (updatedProperty) {
            res.status(202).json({
              status: 202,
              data: {
                id: updatedProperty.id,
                status: updatedProperty.status,
                type: updatedProperty.type,
                state: updatedProperty.state,
                city: updatedProperty.city,
                address: updatedProperty.address,
                price: updatedProperty.price,
                created_on: updatedProperty.createdOn,
                image_url: updatedProperty.imageUrl,
              },
            });
          } else {
            res.status(500).json({
              status: 500,
              error: 'Error updating the property',
            });
          }
        }
      }
    }
  }

  static async markAsSold(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      res.status(404).json({
        status: 404,
        error: 'Property not found',
      });
    } else {
      if (propertyInfo.owner !== req.user.id) {
        res.status(403).json({
          status: 403,
          error: 'You can not edit this property',
        });
      } else {
        const theProperty = await schema.markAsSold([id]);
        if (theProperty) {
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
              created_on: theProperty.createdOn,
              image_url: theProperty.image_url,
            },
          });
        } else {
          res.status(500).json({
            status: 500,
            error: 'Error marking the property as sold',
          });
        }
      }
    }
  }

  static async flag(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      res.status(404).json({
        status: 404,
        error: 'Property not found',
      });
    } else {
      const theProperty = await schema.flag([id]);
      if (theProperty) {
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
            created_on: theProperty.createdOn,
            image_url: theProperty.image_url,
          },
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'Error flagging the property',
        });
      }
    }
  }

  static async viewSpecificProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id], req.user.isAdmin);
    if (!propertyInfo) {
      res.status(404).json({
        status: 404,
        error: 'Property not found',
      });
    } else {
      const userInfo = await schema.getUserByID([propertyInfo.owner]);
      res.status(200).json({
        status: 200,
        data: {
          id: propertyInfo.id,
          status: propertyInfo.status,
          type: propertyInfo.type,
          state: propertyInfo.state,
          city: propertyInfo.city,
          address: propertyInfo.address,
          price: propertyInfo.price,
          created_on: propertyInfo.createdOn,
          image_url: propertyInfo.imageUrl,
          OwnerEmail: userInfo.email,
          OwnerPhoneNumber: userInfo.phoneNumber,
        },
      });
    }
  }

  static async viewAllProperties(req, res) {
    const propertyInfo = await schema.getAllProperties();
    if (!propertyInfo) {
      res.status(401).json({
        status: 401,
        error: 'No Properties found',
      });
    } else {
      res.status(202).json({
        status: 202,
        data: propertyInfo,
      });
    }
  }

  static async deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      res.status(404).json({
        status: 404,
        error: 'Property not found',
      });
    } else {
      if (propertyInfo.owner !== req.user.id) {
        res.status(403).json({
          status: 403,
          error: 'You can not delete this property',
        });
      } else {
        const deletedProperty = await schema.deleteProperty([id]);
        if (deletedProperty) {
          res.status(202).json({
            status: 202,
            message: 'Property successfully deleted',
          });
        } else {
          res.status(500).json({
            status: 500,
            error: 'Error deleteing the property',
          });
        }
      }
    }
  }
}


export default property;
