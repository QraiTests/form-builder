<script setup>
import { defineEmits, defineExpose, ref } from 'vue'

// Emit
const emit = defineEmits(['error'])
// Methods
defineExpose({
	build
})

// Previewer element
const root = ref(null)

// Create element
function createElement(opts) {
	const { type, code } = opts
	let el = null

	// Container element (<DIV>)
	if(type === 'container') {
		el = document.createElement('div')
	}
	// Input element
	else if(type === 'input') {
		el = document.createElement('input')
		el.setAttribute('placeholder', 'Введите текст')
	}
	// Date element
	else if(type === 'datepicker') {
		el = document.createElement('input')
		el.setAttribute('type', 'date')
	}
	// Date element
	else if(type === 'list') {
		el = document.createElement('select')
		for(let item of opts.listdata) {
			el.innerHTML += `<option value="${item.key}">${item.value}</option>`
		}
	}
	// Unknown element
	else {
		throw new Error(`Неизвестный тип элемента: "${type}"`)
	}

	el.setAttribute('id', code)
	return el
}

// Build everything
function build(value) {
	try {
		let elements = JSON.parse(value)

		console.log(elements)

		// Check that is array
		if(!Array.isArray(elements)) {
			emit('error', 'JSON должен быть массивом')
			return
		}

		// Append every element
		for(let element of elements) {
			let el = createElement(element)

			// Attach to parent
			if(typeof element.parent === 'string') {
				root.value.querySelector('#' + element.parent)?.appendChild(el)
			}
			// Without parent (root)
			else {
				root.value.appendChild(el)
			}
		}
	}
	catch (e) {
		// JSON.parse throwed error
		emit('error', e.message)
	}
}
</script>

<template>
	<div class="previewer" ref="root"></div>
</template>

<style lang="scss" scoped>
.previewer::v-deep {
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;

	div[id] {
		padding: var(--spacing-2);

		display: flex;
		flex-direction: column;

		border: 2px solid var(--color-2);
		border-radius: var(--radius-sm);
	}
	input[id], select[id] {
		margin-bottom: var(--spacing-2);

		background-color: var(--color-2);

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>