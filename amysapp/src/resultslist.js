(function(Result){
	var React = require("./react/react");
	module.exports = React.createClass({

		onChange: function(e){
			this.setState({loading: true});
		},

		getInitialState: function(){
			return {loading: false};
		},

		render: function(){
			var index = this.props.page*5;

			items = this.props.data.slice(index-5, index).map(function(data) {
			  return <Result data={data} key={data.key}></Result>;
			});

			return (
			<div className={this.state.loading ? 'loading' : ''}>
				<p className="loading-text">Loading...</p>
				<ul className="comments" onChange={this.onChange}>
					{items}
				</ul>
			</div>);
		}
	
	});

})(require("./result"));