// react library
import React, { Component } from 'react'

// third-party react library
import {
	Table, Input, Button, Icon, Form, Spin, notification, Modal
} from 'antd'
import Highlighter from 'react-highlight-words';
import axios from 'axios'

// styles
import './manage-screen.css';
import FroalaEditor from 'react-froala-wysiwyg'

const { confirm } = Modal;

class ManagePage extends Component {
	state={
		selectedView: 'create',
		isLoading: false,
		isRefreshing: false,
		data: [],
		URL: 'https://detectify-note-app.herokuapp.com/api/user',
		selectedNote: [],
		category: '',
		content: '',
		// URL: 'http://localhost:8000/api/user',
		pageNumber: 1
	}
	
	componentDidMount () {
		let userDetails = localStorage.getItem('userDetails')
		this.setState({
			userId: JSON.parse(userDetails).id
		}, () => this.getAllNotes())
	}
	
	/**
	 * notification
	 *
	 * @param heading
	 * @param message
	 * @param type
	 */
	notification = (heading, message, type) => {
		notification[`${type}`]({
			message: `${heading}`,
			description: `${message}`,
			style: {
				width: 600,
				marginLeft: 335 - 600,
			},
		});
	};
	
	/**
	 * getAllNotes
	 */
	getAllNotes = () => {
		const { URL, userId } = this.state
		this.setState({ isLoading: true })
		
		axios.get(`${URL}/${userId}/notes`)
			.then((response) => {
				this.setState({ isLoading: false, data: response.data })
				this.notification("Notes!", `Notes retrieved successfully`, "success")
			})
			.catch((error) => {
				console.log(error)
				this.setState({ isLoading: false })
				if(error.response === undefined) {
					this.notification("Error", `Connection Error`, "error");
				} else {
					console.log(error.response);
					this.notification("Error", `${error.response.data.message}`, "error");
				}
			});
	}
	
	/**
	 * getColumnSearchProps
	 *
	 * @param dataIndex
	 * @return {{filterDropdown: (function({setSelectedKeys: *, selectedKeys?: *, confirm?: *, clearFilters?: *}): *), filterIcon: (function(*): *), onFilter: (function(*, *): boolean), onFilterDropdownVisibleChange: onFilterDropdownVisibleChange, render: (function(*): *)}}
	 */
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			                 setSelectedKeys, selectedKeys, confirm, clearFilters,
		                 }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => { this.searchInput = node; }}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => {
			// console.log(text)
			return (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			)
		},
	})
	
	/**
	 * handleSearch
	 *
	 * @param selectedKeys
	 * @param confirm
	 */
	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	}
	
	/**
	 * handleReset
	 *
	 * @param clearFilters
	 */
	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	}
	
	/**
	 * getNoteId
	 *
	 * @param record
	 * @param number
	 */
	getNoteId = (record, number) => {
		const { data }  = this.state
		let index;
		Object.keys(data).forEach((note) => {
			if(record.id === data[note].id) {
				return index = note
			}
		})
		
		return number === 0 ? this.updateNote(index) : this.deleteNote(index)
	}
	
	/**
	 * updateNote
	 *
	 * @param index
	 */
	updateNote = (index) => {
		const { URL, userId, category, content, noteId } = this.state
		
		this.setState({ isRefreshing: true })

		axios.put(`${URL}/${userId}/notes/${noteId}`, {
			content,
			category
			})
			.then((response) => {
				this.setState({
					loading: false
				})
				if(response.data.status) {
					let newState = Object.assign({}, this.state);
					newState.data[index.toString()] = response.data.data;
					this.setState(newState);
					this.notification("Success!", `${response.data.message}`, "success");
					this.setState({
						isRefreshing: false
					})
				}
			})
			.catch((error) => {
				console.log(error)
				this.setState({ isRefreshing: false })
				if(error.response === undefined) {
					this.notification("Error", `Connection Error`, "error");
				} else {
					console.log(error.response);
					this.notification("Error", `${error.response.data.message}`, "error");
				}
			});
	}
	
	/**
	 * deleteNote
	 * @param index
	 * @param val
	 */
	deleteNote = (index) => {
		const { URL, userId, noteId } = this.state
		
		this.setState({ isRefreshing: true })

		axios.delete(`${URL}/${userId}/notes/${noteId}`)
			.then((response) => {
				if(response.data.status) {
					this.notification("Success!", `${response.data.message}`, "success");
					let newState = this.state.data.filter( item=> item !== this.state.data[index]  )
					this.setState({ data: newState, isRefreshing: false });
					
				}
			})
			.catch((error) => {
				console.log(error)
				this.setState({ isRefreshing: false })
				if(error.response === undefined) {
					this.notification("Error", `Connection Error`, "error");
				} else {
					console.log(error.response);
					this.notification("Error", `${error.response.data.message}`, "error");
				}
			});
	}
	
	/**
	 *
	 */
	showDeleteConfirm = (record, number) => {
		confirm({
			title: 'Are you sure delete this note?',
			content: 'You would loose this note forever',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => this.getNoteId(record, number),
			onCancel() {
				// console.log('Cancel');
			},
		});
	}
	
	/**
	 * handleCategoryOnChange
	 *
	 * @param e
	 */
	handleCategoryOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	/**
	 * handleContentChange
	 *
	 * @param content
	 */
	handleContentChange = (content) => {
		this.setState({ content: content })
	}
	
	render () {
		const {
			isRefreshing, isLoading, data, category, content,
		} = this.state
		const { getFieldDecorator } = this.props.form
		
		/**
		 * columns
		 *
		 * @type {*[]}
		 */
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				width: '30%',
				...this.getColumnSearchProps('id'),
			}, {
				title: 'Category',
				dataIndex: 'category',
				key: 'category',
				width: '30%',
				...this.getColumnSearchProps('category'),
			}, {
				title: 'Date Created',
				dataIndex: 'createdAt',
				key: 'createdAt',
				width: '30%',
				...this.getColumnSearchProps('createdAt'),
			}, {
				title: 'Date Updated',
				dataIndex: 'updatedAt',
				key: 'updatedAt',
				width: '30%',
				...this.getColumnSearchProps('updatedAt'),
			},
		];
		
		/**
		 * expandedRowRender
		 *
		 * @param record
		 * @return {*}
		 */
		const expandedRowRender = (record) => {
			
			return (
				<div>
					
					<Form onSubmit={this.handleSubmit} className="note-form">
						<Form.Item
							label="Category"
						>
							{getFieldDecorator('category', {
								initialValue: category || record.category,
								rules: [{
									required: true,
									message: 'Please enter note category'
								}, {
									min: 1,
									message: 'Please enter note category'
								}],
							})(
								<Input
									disabled={isLoading}
									name={'category'}
									onChange={this.handleCategoryOnChange}
									allowClear
									placeholder="Enter note category"
								/>
							)}
						</Form.Item>
						<div
							style={{
								marginTop: 20
							}}
						>
							<FroalaEditor
								config={{
									placeholderText: `${record.content}`,
									charCounterCount: false,
								}}
								disabled={true}
								heightMin={500}
								model={content}
								onModelChange={this.handleContentChange}
							/>
						</div>
						<div
							style={{
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
							}}
						>
							<Button
								style={{
									backgroundColor: '#0c2136',
									color: '#FFFFFF',
								}}
								disabled={isRefreshing}
								onClick={() => this.getNoteId(record, 0)}
								icon="save"
							>
								UPDATE
							</Button>
							
							<Button
								style={{
									backgroundColor: '#820014',
									color: '#FFFFFF',
									alignSelf: 'flex-end',
									marginLeft: 30,
									marginTop: 30,
								}}
								disabled={isRefreshing}
								onClick={() => this.showDeleteConfirm(record, 1)}
								// onClick={() => this.getNoteId(record, 1)}
								icon="delete"
							>
								DELETE
							</Button>
						</div>
					</Form>
				</div>
			)
		};
		
		return (
			<div
				style={{
					padding: 24,
					background: '#fff',
					height: '90%',
				}}>
				{
					isLoading ? (
							<div >
								<Spin size="small" />
								<Spin />
								<Spin size="large" />
							</div>
						) :
						<div>
							<div
								style={{
									paddingBottom: 24,
								}}
							>
								<Button
									onClick={this.getAllNotes}
									type="primary"
									shape="circle"
									icon="reload"
									// size={10}
								/>
							</div>
							<Table
								scroll={{ y: 500 }}
								pagination={{
									defaultPageSize: 5,
									total: data.length,
									pageSizeOptions: ["5", "10", "20", "30"],
									showSizeChanger: true,
									locale: {items_per_page: ""}
								}}
								onChange={(pageInfo) => this.setState({
									pageIndex: pageInfo.current
								}) }
								locale={{ items_per_page: '9' }}
								defaultPageSize={5}
								loading={isLoading}
								className="components-table-demo-nested"
								rowKey={record => record.id}
								expandedRowRender={expandedRowRender}
								columns={columns}
								dataSource={data}
								onExpand={(expanded, record) => this.setState({
									category: record.category,
									content: record.content,
									noteId: record.id
								})}
							/>
						</div>
				}
			</div>
		)
	}
}

export const ManageScreen = Form.create()(ManagePage);
