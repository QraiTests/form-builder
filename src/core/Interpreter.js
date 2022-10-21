import { ContainerNode, DatePickerNode, InputNode, ListNode, Node } from "./Node"

export default new (class Interpreter {
	interprete(nodes) {
		let root = []

		// Create node from options
		const create = (opts) => {
			switch(opts.type) {
				case 'container':
					return new ContainerNode(opts.code)
				case 'input':
					return new InputNode(opts.code)
				case 'datepicker':
					return new DatePickerNode(opts.code)
				case 'list':
					return new ListNode(opts.code, opts.listdata)
				default:
					return new Node(opts.type, opts.code)
			}
		}

		// Find node by code in tree
		const find = (code, from = root) => {
			// Walk root
			for(let node of from) {
				// Self?
				if(node.code === code) {
					return node
				}
				// In children
				let resultInChildren = find(code, node.children)
				if(resultInChildren) {
					return resultInChildren
				}
			}

			return null
		}

		// Walk given list
		for(let node of nodes) {
			if(node.parent === null) {
				root.push(create(node))
			}
			else {
				let parent = find(node.parent)
				if(parent) {
					parent.addChildren(create(node))
				}
				else {
					throw new Error('Please define parent first, before adding childrens')
				}
			}
		}

		// Root as result
		return root
	}
})