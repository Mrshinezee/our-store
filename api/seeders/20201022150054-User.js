import bcrypt from 'bcrypt';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Sylvanus',
        lastName: 'Elendu',
        email: 'chidimma.okafor@gmail.com',
        password: bcrypt.hashSync('IamUser', 10),
        postcode: '10242',
        phone: 81,
        active: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'frank',
        lastName: 'chidinma',
        email: 'stephenibaba@andela.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        postcode: '10242',
        phone: 81,
        active: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'frank',
        lastName: 'chidinma',
        email: 'stepbaba@andela.com',
        password: bcrypt.hashSync('Chibyke7&', 10),
        postcode: '10242',
        phone: 81,
        active: true,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
