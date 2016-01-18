(function(){
	var React = require("./react/react");

	module.exports = React.createClass({

		submit: function(){
			var data = JSON.stringify(this.props);
				xhr = new XMLHttpRequest();
		    xhr.onreadystatechange = function(){};
		    xhr.open("POST", "page2.html", true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
			console.log(data, xhr);
		},

		render: function(){
			var item = this.props.data;
			if (item.organization_name) {
				return <li className="result">
					<input onChange={this.submit} type="radio" name="provider" value={item.npi} id={item.key}/>
					<label htmlFor={item.key}> {item.organization_name}
						<div className="subtext">We found 1 {item.organization_name} at 1 location</div>
					</label>
				</li>			
			} else
			return <li className="result">
				<input onChange={this.submit} type="radio" name="provider" value={item.npi} id={item.key}/>
				<label htmlFor={item.key}> Dr. {item.first_name} {item.last_name}
					<div className="subtext">We found 1 {item.first_name} {item.last_name} practicing at 1 location</div>
				</label>
			</li>
		}
	});
})()