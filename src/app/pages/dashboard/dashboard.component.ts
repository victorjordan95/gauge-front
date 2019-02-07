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
    public filter;
    public selectedBrand;

    public influencersUsers = [];
    public topFiveUsers = [];
    public influencersUsersByBrand = [];


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
        this.selectedBrand = this.brands[0].name;

        this.getInfluencersUsers();
        this.getBrandsById();
    }

    /**
     * Sort method to order the
     * content of the HTML table.
     * @param key the clicked header value of the table.
     */
    sort(key): void {
        this.key = key;
        this.reverse = !this.reverse;
    }

    /**
     * TODO: When click, the page could show info about the clicked info
     * Show the clicked label info.
     * @param event Clicked label in chart
     */
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

    /**
      * Get the brands by specific ID.
      * The function will return a new
      * object with only the users with
      * the same brand ID and sort
      * by decreasing value.
      * @param id Id of the brand, 1 is the default value
      */
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

    /**
     * Method fired when the user change
     * the brand in combobox of the bar chart.
     * @param e The selected value in combobox
     */
    public onChange(e) {
        this.getBrandsById(e);
    }

}
