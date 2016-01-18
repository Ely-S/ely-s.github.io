(function(){
	var React = require("./react/react"),
		DOM = require("./react/react-dom"),
		Result = require("./result"),
		ResultsList = require("./resultslist"),
		DB = require("./db");

	var Search = React.createClass({

		onSearch: function(event) {
			var query = event.target.value.trim().toLowerCase();
			this.setState({
				query: query,
				page: 1,
				data: this.filter(query)
			});
			location.hash = query;
		},

		filter: function(query){
			if (!query) return [];
			return DB.filter(function(e){
				// filter by organization or doctor name
				return ((e.organization_name && e.organization_name.toLowerCase().indexOf(query) != -1)
					|| (e.last_name &&(e.last_name+ " " + e.first_name).toLowerCase().indexOf(query) != -1) )
			})
		},

		getInitialState: function(){
			var state = location.hash.slice(1).split(":").map(decodeURIComponent),
				query = state[0],
				page = Number(state[1]) ? Number(state[1]) : 1;

			return {
				data: this.filter(query),
				query: query,
				page: page
			}
		},

		view: function(page_num) {
			this.setState({data: this.state.data, page: page_num});
			location.hash = "#" + [this.state.query, page_num].map(encodeURIComponent).join(":");

		},

		render: function() {
			var num_pages = Math.ceil(this.state.data.length/5),
				hash = "#" + encodeURIComponent(this.state.query) + ":";
			
			if (num_pages > 1) {
				for (var pageIcons = [], i = 1; i <= num_pages; i++) {
					pageIcons.push(
						<a
							className={"page-icon" + (this.state.page == i ? " active" : "")}
							onClick={this.view.bind(this, i)}
							href={hash + i}
							key={i}>{i}</a>);
				}

				// add next and back butons
				pageIcons.unshift(
					<a
						className="page-icon back"
						href={hash + (this.state.page-1||1) }
						key={'back'}
						onClick={this.view.bind(this, (this.state.page-1 ||1 ))}>
							&lt;</a>);
					
					pageIcons.push(
						<a
							className="page-icon next"
							key={'foreward'}
							href={hash + (this.state.page < num_pages ? this.state.page+1 : this.state.page )}
							onClick={this.view.bind(this, this.state.page < num_pages ? this.state.page+1 : this.state.page )}>
								<img src="img/next.png" alt="&gt;" /></a>);
			}

			return (
				  <div>
						<div className="input-field col s15" id="search-field">
						<input placeholder="Search for a doctor, physician, or organization by name"
							id="search" type="search" value={this.state.query} onChange={this.onSearch}/>
						</div>
						<ResultsList data={this.state.data} page={this.state.page}/>
						<div className="icons">{pageIcons}</div>
				  </div>
			);
	  }
	});


	DOM.render(<Search />, document.getElementById('search'));

})();