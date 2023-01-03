import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '../../constants/app.constants';

@Component({
    selector: 'app-load-more',
    templateUrl: './load-more.component.html',
    styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {

    @Input() isHidden = true; // Hide/Show
    @Input() isLoading = false; // Show loading

    limit: number = AppConstants.DEFAULT_QUERY_LIMIT;
    offset: number = 1;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.limit = params.limit ? parseInt(params.limit) : AppConstants.DEFAULT_QUERY_LIMIT;
        });
    }

    _loadMore() {
        this.limit += 10;
        const queryParams = {
            limit: this.limit,
        }
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams
        });
    }

}
