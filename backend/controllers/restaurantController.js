const list = (req, res) => {
  res.json({
    success: true,
    restaurants: [
      {
        id: 1,
        name: 'Seoul Kitchen',
        category: 'Korean',
        minOrder: 12000,
      },
      {
        id: 2,
        name: 'Busan Bites',
        category: 'Seafood',
        minOrder: 15000,
      },
    ],
  });
};

module.exports = {
  list,
};
