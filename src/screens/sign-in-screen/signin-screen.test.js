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
import { SignInScreen } from '../sign-in-screen';

configure({ adapter: new Adapter() });


describe('<SignInScreen />', () => {
	
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SignInScreen />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	
	it('renders three <Foo /> components', () => {
		const wrapper = mount(<SignInScreen />);
		expect(wrapper.find('div')).to.have.lengthOf(15);
	});
	
	it('allows us to set props', () => {
		const wrapper = mount(<SignInScreen bar="baz" />);
		expect(wrapper.props().bar).to.equal('baz');
		wrapper.setProps({ bar: 'foo' });
		expect(wrapper.props().bar).to.equal('foo');
	});
	
	it('calls componentDidMount', () => {
		spy(SignInScreen.prototype, 'componentDidMount');
		const wrapper = mount(<SignInScreen />);
		expect(SignInScreen.prototype.componentDidMount).to.have.property('callCount', 1);
		SignInScreen.prototype.componentDidMount.restore();
	});
	
	it('renders length of div to be 16', () => {
		const wrapper = mount(<SignInScreen bar="baz" />);
		expect(wrapper.find('div')).to.have.lengthOf(15);
	});
	
	it('renders 1 form in `SignInScreen`', () => {
		const wrapper = mount(<SignInScreen bar="baz" />);
		expect(wrapper.find('Form')).to.have.lengthOf(1);
	});
	
	it('renders 1 button in `SignInScreen`', () => {
		const wrapper = mount(<SignInScreen bar="baz" />);
		expect(wrapper.find('Button')).to.have.lengthOf(1);
	});
	
	describe('Testing <SignInScreen /> functions', () => {
		
		it('should find button and click', () => {
			const wrapper = mount(<SignInScreen />);
			const action = wrapper.find('Button.login-form-button').simulate('click');
			console.log(action)
			expect(action).to.be.an.instanceof(Object)
			wrapper.unmount();
		});
		
		it('should the email input and click', () => {
			const wrapper = mount(<SignInScreen />);
			const action = wrapper.find('Input.email').simulate('click');
			console.log(action)
			expect(action).to.be.an.instanceof(Object);
			wrapper.unmount();
		});
		
		it('should the password input and click', () => {
			const wrapper = mount(<SignInScreen />);
			const action = wrapper.find('Input.password').simulate('click');
			console.log(action)
			expect(action).to.be.an.instanceof(Object);
			wrapper.unmount();
		});
	});
	
});
