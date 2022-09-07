import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../services/theme.service";

@Component({
    selector: 'app-theme-btn',
    templateUrl: './theme-btn.component.html',
    styleUrls: ['./theme-btn.component.scss']
})
export class ThemeBtnComponent implements OnInit {
    title = 'theme-btn'

    constructor(private themeService: ThemeService) {
    }

    themeToggler(): void {
        this.themeService.toggleTheme()
    }

    ngOnInit(): void {
    }

}
