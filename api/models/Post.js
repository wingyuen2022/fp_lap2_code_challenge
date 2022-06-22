const db = require('../dbConfig/init');

module.exports = class Post {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.story = data.story;
        this.date = data.date
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let data = await db.query('SELECT * FROM posts');
                let posts = data.rows.map(b => new Post(b));
                resolve (posts);
            } catch (err) {
                reject('Post not found');
            }
        });
    };

    
    
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let data = await db.query(`SELECT * FROM posts WHERE id = $1;`, [ id ]);
                let post = new Post(data.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    };
    
    static async create(newData){
        return new Promise (async (resolve, reject) => {
            try {
                let data = await db.query(`INSERT INTO posts (title, name, story) VALUES ($1, $2, $3) RETURNING *;`, [ newData.title, newData.name, newData.story ]);
                resolve (data.rows[0]);
            } catch (err) {
                reject('Post could not be created');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM posts WHERE id = $1', [ this.id ]);
                resolve('Post was deleted')
            } catch (err) {
                reject('Post could not be deleted')
            }
        })
    };
};