const product  = async (req, res) => {
    try {
      const products = [
        {
            name:"iphone",
            quantity:30,
            price:650000
        },
        {
            name:"samsung",
            quantity:100,
            price:350000
        },
        {
            name:"vivo",
            quantity:200,
            price:100000
        },
      ];
      return res.status(200).json({ Products: products });
    } catch (error) {
      console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = product 