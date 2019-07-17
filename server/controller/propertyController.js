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
}


export default property;
