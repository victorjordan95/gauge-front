export class Brands {
    id: number;
    name: String;
    image: String;

    public get brands() {
        const brands = [
            {
                'id': 1,
                'name': 'Ambev',
                'image': 'http://www.gauge.com.br/wp-content/uploads/2014/12/ambev.png'
            },
            {
                'id': 2,
                'name': 'Nike',
                'image': 'http://www.gauge.com.br/wp-content/uploads/2014/12/nike.png'
            },
            {
                'id': 3,
                'name': 'Honda',
                'image': 'http://www.gauge.com.br/wp-content/uploads/2014/12/honda.png'
            },
            {
                'id': 4,
                'name': 'Oi',
                'image': 'http://www.gauge.com.br/wp-content/uploads/2014/12/oi.png'
            },
            {
                'id': 5,
                'name': 'Itaú',
                'image': 'http://www.gauge.com.br/wp-content/uploads/2014/12/itau.png'
            }
        ];

        return brands;
    }
}
