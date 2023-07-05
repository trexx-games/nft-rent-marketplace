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
  // rentee: null,
  // isInPool: false, 
  gameId: 123, 
  nftContractAddress: 'qwe', 
  rarityId: 123, 
  blockchainId: 123,
  // isRented: false,
};
// não são obrigatórios para criar o item, possuem valor default.

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

const requiredFields = ['itemId', 'categoryId', 'owner', 'gameId', 'nftContractAddress', 'nftId', 'rarityId', 'blockchainId'];


module.exports = { mockItem, mockNewItem, requiredFields, mockUpdateItem }