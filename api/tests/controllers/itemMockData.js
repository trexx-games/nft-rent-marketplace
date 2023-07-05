const mockItem = { 
    itemId: 456, 
    nftId: 123, 
    categoryId: 123, 
    owner: 'Ana123',
    rentee: 'Bia456',
    isInPool: true,
    gameId: 123, 
    nftContractAddress: 'asd', 
    rarityId: 123, 
    blockchainId: 456,
    isRented: true,
};
  
const mockNewItem = { 
      itemId: 123, 
      nftId: 456, 
      categoryId: 123, 
      owner: 'Ana123',
      rentee: 'Bia456',
      isInPool: false, 
      gameId: 123, 
      nftContractAddress: 'qwe', 
      rarityId: 123, 
      blockchainId: 123,
      isRented: false,
};

const mockUpdateItem = { 
      itemId: 123, 
      nftId: 456, 
      categoryId: 123, 
      owner: 'Ana123',
      rentee: 'Bia456',
      isInPool: true, 
      gameId: 123, 
      nftContractAddress: 'qwe', 
      rarityId: 123, 
      blockchainId: 123,
      isRented: false,
};

const requiredFields = ['itemId', 'categoryId', 'owner', 'rentee', 'isInPool', 'gameId', 'nftContractAddress', 'nftId', 'rarityId', 'blockchainId', 'isRented'];


module.exports = { mockItem, mockNewItem, requiredFields, mockUpdateItem }