import uploadImage from '../helpers/cloudinary';
import schema from '../schema/schema';
import response from '../helpers/responses';


class property {
  static async addProperty(req, res) {
    const {
      type, state, city, address, price,
    } = req.body;
    parseInt(price, 10);
    let image;
    const checkProperty = await schema.checkProperty([
      price,
      address,
      type,
    ]);
    if (!checkProperty) {
      if (req.files) {
        if (process.env.NODE_ENV !== 'test') {
          const file = req.files.photo;
          image = await uploadImage(file.tempFilePath);
          if (!image) {
            response.error(res, 500, 'Could not upload image');
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
              response.success(res, 201, {
                id: addedProperty.id,
                status: addedProperty.status,
                type: addedProperty.type,
                state: addedProperty.state,
                city: addedProperty.city,
                address: addedProperty.address,
                price: addedProperty.price,
                created_on: addedProperty.createdon,
                image_url: addedProperty.image_url,
              });
            }
          }
        } 
      } else {
        let addedProperty;
        if (process.env.NODE_ENV === 'test') {
          addedProperty = await schema.addProperty([
            1,
            price,
            state,
            city,
            address,
            type,
          ], false);
        } else {
          addedProperty = await schema.addProperty([
            req.user.id,
            price,
            state,
            city,
            address,
            type,
          ], false);
        }
        if (addedProperty) {
          response.success(res, 201, {
            id: addedProperty.id,
            status: addedProperty.status,
            type: addedProperty.type,
            state: addedProperty.state,
            city: addedProperty.city,
            address: addedProperty.address,
            price: addedProperty.price,
            created_on: addedProperty.createdon,
          });
        } else {
          response.error(res, 500, 'Error adding the property');
        }
      }
    } else {
      response.error(res, 409, 'Property already exists');
    }
  }

  static async updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      type, state, city, address, price,
    } = req.body;
    parseInt(price, 10);
    let image;
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      response.error(res, 404, 'Property not found');
    } else {
      if (propertyInfo.owner !== req.user.id) {
        response.error(res, 403, 'You can not edit this property');
      } else {
        if (req.files) {
          if (process.env.NODE_ENV !== 'test') {
            const file = req.files.photo;
            image = await uploadImage(file.tempFilePath);
            if (!image) {
              response.error(res, 500, 'Could not upload image');
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
                response.success(res, 201, {
                  id: updatedProperty.id,
                  status: updatedProperty.status,
                  type: updatedProperty.type,
                  state: updatedProperty.state,
                  city: updatedProperty.city,
                  address: updatedProperty.address,
                  price: updatedProperty.price,
                  created_on: updatedProperty.createdOn,
                  image_url: updatedProperty.image_url,
                });
              } else {
                response.error(res, 500, 'Error updating the property');
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
            response.success(res, 202, {
              id: updatedProperty.id,
              status: updatedProperty.status,
              type: updatedProperty.type,
              state: updatedProperty.state,
              city: updatedProperty.city,
              address: updatedProperty.address,
              price: updatedProperty.price,
              created_on: updatedProperty.createdOn,
              image_url: updatedProperty.imageUrl,
            });
          } else {
            response.error(res, 500, 'Error updating the property');
          }
        }
      }
    }
  }

  static async markAsSold(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      response.error(res, 404, 'Property not found');
    } else {
      if (propertyInfo.owner !== req.user.id) {
        response.error(res, 403, 'You can not edit this property');
      } else {
        const theProperty = await schema.markAsSold([id]);
        if (theProperty) {
          response.success(res, 202, {
            id: theProperty.id,
            status: theProperty.status,
            type: theProperty.type,
            state: theProperty.state,
            city: theProperty.city,
            address: theProperty.address,
            price: theProperty.price,
            created_on: theProperty.createdOn,
            image_url: theProperty.image_url,
          });
        } else {
          response.error(res, 500, 'Error marking the property as sold');
        }
      }
    }
  }

  static async flag(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      response.error(res, 404, 'Property not found');
    } else {
      const theProperty = await schema.flag([id]);
      if (theProperty) {
        response.success(res, 202, {
          id: theProperty.id,
          status: theProperty.status,
          type: theProperty.type,
          state: theProperty.state,
          city: theProperty.city,
          address: theProperty.address,
          price: theProperty.price,
          created_on: theProperty.createdOn,
          image_url: theProperty.image_url,
        });
      } else {
        response.error(res, 500, 'Error flagging the property');
      }
    }
  }

  static async viewSpecificProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id], req.user.isAdmin);
    if (!propertyInfo) {
      response.error(res, 404, 'Property not found');
    } else {
      const userInfo = await schema.getUserByID([propertyInfo.owner]);
      response.success(res, 200, {
        ...propertyInfo,
        OwnerEmail: userInfo.email,
        OwnerPhoneNumber: userInfo.phonenumber,
      });
    }
  }

  static async viewAllProperties(req, res) {
    if (req.query.type) {
      const { type } = req.query;
      const propertyInfo = await schema.getPropertiesByType([type], req.user.isAdmin);
      if (propertyInfo.length === 0) {
        response.error(res, 404, 'No Properties found');
      } else {
        response.success(res, 200, propertyInfo);
      }
    } else if (req.query.status) {
      const { status } = req.query;
      const propertyInfo = await schema.getPropertiesByStatus([status]);
      if (propertyInfo.length === 0) {
        response.error(res, 404, 'No Properties found');
      } else {
        response.success(res, 200, propertyInfo);
      }
    } else {
      const propertyInfo = await schema.getAllProperties(req.user.isAdmin);
      if (propertyInfo.length === 0) {
        response.error(res, 404, 'No Properties found');
      } else {
        response.success(res, 200, propertyInfo);
      }
    }
  }

  static async deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const propertyInfo = await schema.getProperty([id]);
    if (!propertyInfo) {
      response.error(res, 404, 'Property not found');
    } else {
      if (propertyInfo.owner !== req.user.id) {
        response.error(res, 403, 'You can not delete this property');
      } else {
        const deletedProperty = await schema.deleteProperty([id]);
        if (deletedProperty) {
          response.success(res, 202, 'Property successfully deleted');
        } else {
          response.error(res, 500, 'Error deleting the property');
        }
      }
    }
  }
}


export default property;
