export const NodeType = [
	'container',
	'input',
	'datepicker',
	'list'
]

export class Node {
	constructor(type, code) {
		if(!NodeType.includes(type)) {
			throw new Error(`Invalid type "${type}", expected: ${NodeType.join(' or ')}`)
		}
		if(typeof code !== 'string') {
			throw new Error(`Invalid code "${code}", expected string`)
		}

		this.type = type
		this.code = code
		this.children = []
	}

	addChildren(node) {
		if((node instanceof Node) === false) {
			throw new Error(`Invalid node "${node}", expected instance of Node`)
		}

		this.children.push(node)
	}
}

export class ContainerNode extends Node {
	constructor(code) {
		super('container', code)
	}
}

export class InputNode extends Node {
	constructor(code) {
		super('input', code)
	}
}

export class DatePickerNode extends Node {
	constructor(code) {
		super('datepicker', code)
	}
}

export class ListNode extends Node {
	constructor(code, listdata) {
		super('list', code)

		if(!Array.isArray(listdata) || !listdata.every(data => 'key' in data && 'value' in data)) {
			throw new Error(`Invalid listdata "${listdata}", expected array of { key, value }`)
		}

		this.listdata = listdata
	}
}