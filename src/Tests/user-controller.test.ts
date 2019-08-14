import 'jest'
import  request from 'supertest'
import {App} from '../app';
import {UserDAO}  from '../DAO/user-dao'
import * as env from './test.env';


describe("/users integration tests", ()=>{
    let userId = undefined;
    const user = {
        givenName: 'User',
        familyName: 'Name',
        email:'username@test.com'
    };
    const dao = new UserDAO();

    beforeAll(async done => {
        console.log("preparing tests...")
        await App.start(env.DB_URL, env.PORT);
        await dao.deleteAll();
        done();
    });

    afterAll(async done =>{
        await App.end();
        done();
    })

    test('should create new user', () =>{
        return request(env.endpoint)
        .post('/users')
        .send(user)
          .then(response=>{
                expect(response.status).toBe(200);
                expect(response.body.id).toBeDefined();
                expect(response.body.message).toEqual("Successfully created!");
                userId = response.body.id;
          });
    });

    test('should get the created user', ()=>{
        return request(env.endpoint)
        .get(`/users/${userId}`)
        .then(response=>{
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body._id).toEqual(userId);
            expect(response.body.givenName).toEqual(user.givenName);
            expect(response.body.familyName).toEqual(user.familyName);
            expect(response.body.email).toEqual(user.email);
        }).catch(fail);
    });

    test('should update givenName property of the create user', () =>{
        return request(env.endpoint)
        .patch(`/users/${userId}`)
        .set('Content-Type', 'application/merge-patch+json')
        .send({givenName: 'Newuser'})
          .then(response=>{
                expect(response.status).toBe(200);
                expect(response.body.givenName).toEqual('Newuser');
                expect(response.body.familyName).toEqual(user.familyName);
                expect(response.body.email).toEqual(user.email);
          });
    });

    test('should ovewrite the created user', () =>{
        return request(env.endpoint)
        .put(`/users/${userId}`)
        .send({givenName: 'Test', familyName: 'Test', email: 'test@test.com'})
          .then(response=>{
                expect(response.status).toBe(200);
                expect(response.body.message).toEqual('Successfully Overwritten!');
          });
    });

    test('should recreate the initial user', () =>{
        return request(env.endpoint)
        .post(`/users`)
        .send(user)
          .then(response=>{
                expect(response.status).toBe(200);
                expect(response.body.message).toEqual("Successfully created!");
          });
    });

    test('should throw error trying to create user with duplicated email', () =>{
        return request(env.endpoint)
        .post(`/users`)
        .send(user)
          .then(response=>{
                expect(response.status).toBe(400);
                expect(response.body.message).toContain("duplicate key error collection");
          });
    });

    test('should get all users - total = 2', ()=>{
        return request(env.endpoint)
        .get('/users')
        .then(response=>{
            expect(response.status).toBe(200);
            expect(response.body.count).toBe(2);
        }).catch(fail);
    });

    test('should get users using pagination to return only 1 item', ()=>{
        return request(env.endpoint)
        .get('/users?top=1&skip=0')
        .then(response=>{
            expect(response.status).toBe(200);
            expect(response.body.count).toBe(1);
        }).catch(fail);
    });

    test('should delete the first created user', ()=>{
        return request(env.endpoint)
        .del(`/users/${userId}`)
        .then(response=>{
            expect(response.status).toBe(204);
        }).catch(fail);
    });

    test('should throw not found response when trying to get the deleted user', ()=>{
        return request(env.endpoint)
        .get(`/users/${userId}`)
        .then(response=>{
            expect(response.status).toBe(404);
        }).catch(fail);
    });

    test('should throw not found response when trying to delete the first created user again', ()=>{
        return request(env.endpoint)
        .del(`/users/${userId}`)
        .then(response=>{
            expect(response.status).toBe(404);
        }).catch(fail);
    });
});