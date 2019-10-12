// react
import React from 'react';

// third-party
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16'
// component
import App from './App';

configure({ adapter: new Adapter() });


describe('<App />', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	
	it('renders three <Foo /> components', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('div')).to.have.lengthOf(16);
	});
	
	it('allows us to set props', () => {
		const wrapper = mount(<App bar="baz" />);
		expect(wrapper.props().bar).to.equal('baz');
		wrapper.setProps({ bar: 'foo' });
		expect(wrapper.props().bar).to.equal('foo');
	});
	
	it('renders three `App`s', () => {
		const wrapper = mount(<App bar="baz" />);
		expect(wrapper.find('div')).to.have.lengthOf(16);
	});
	
});
