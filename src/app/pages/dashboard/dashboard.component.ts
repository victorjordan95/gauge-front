import { Users } from './../../api/users';
import { Iteractions } from './../../api/interactions';
import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/api/brands';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public interactions;
    public brands;

    // Pie Chart settings
    view: any[] = [400, 300];

    public influencersUsers = [];
    public topFiveUsers = [];
    public influencersUsersByBrand = [];

    public selectedBrand;
    public hasData = false;


    // Table variables
    public key = 'brand';
    public reverse = false;
    public p = 1;

    constructor() { }

    ngOnInit() {
        const i = new Iteractions;
        this.interactions = i.interactions;
        const b = new Brands;
        this.brands = b.brands;
        
        const u = new Users;
        this.interactions.forEach((element: any) => {
            u.users.forEach((el: any) => {
                if (element.user === el.id) {
                    element['name'] = el.name.first;
                }
            });
        });
        console.log(this.interactions);

        this.selectedBrand = this.brands[0].name;

        this.getInfluencersUsers();
        this.getBrandsById();
    }

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    onSelect(event) {
        console.log(event);
    }

    /*
      * Get the influencer users
      * The function will get all the users
      * and remove duplicated IDs.
      * After that, will count how many
      * times the element repeat.
    */
    private getInfluencersUsers() {
        const users = this.interactions.map(el => el.name);
        const uniqueUsers = [...new Set(users)];

        uniqueUsers.forEach(element => {
            this.influencersUsers.push(
                {name: element, value: 0}
            );
        });

        this.interactions.forEach(element => {
            this.influencersUsers.forEach(newUser => {
                if (element.name === newUser.name) {
                    newUser.value += 1;
                }
            });
        });

        this.influencersUsers.sort((a, b) => b.value - a.value);
        for (let index = 0; index < 5; index++) {
            this.topFiveUsers.push(this.influencersUsers[index]);
        }
    }

    private getBrandsById(id = 1) {
        this.influencersUsersByBrand = [];

        // Return all users of the selected brand Id
        const usersByBrand = this.interactions.filter(el => el.brand === id);
        let userIdByBrand = usersByBrand.map(el => el.name);
        userIdByBrand = [...new Set(userIdByBrand)];

        userIdByBrand.forEach(element => {
            this.influencersUsersByBrand.push(
                {name: element, value: 0}
            );
        });

        usersByBrand.forEach(element => {
            this.influencersUsersByBrand.forEach(newUser => {
                if (element.name === newUser.name) {
                    newUser.value += 1;
                }
            });
        });
        this.influencersUsersByBrand.sort((a, b) => b.value - a.value);
    }

    public onChange(e) {
        this.getBrandsById(e);
    }

}
