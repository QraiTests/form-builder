<script setup>
import { defineEmits, defineExpose, ref } from 'vue'

import Interpreter from '@/core/Interpreter'

import TheFormComponent from './TheFormComponent.vue'

// Emit
const emit = defineEmits(['error'])
// Methods
defineExpose({
	build
})

// Elements to display
const elements = ref([])

// Build everything
function build(value) {
	try {
		let elements = JSON.parse(value)

		// Check that is array
		if(!Array.isArray(elements)) {
			emit('error', 'JSON должен быть массивом')
			return
		}

		// Interpretate flat array to tree
		let result = Interpreter.interprete(elements)
		elements.values = result
		console.log(elements.values)
	}
	catch (e) {
		// JSON.parse throwed error
		emit('error', e.message)
	}
}
</script>

<template>
	<div class="previewer">
		<TheFormComponent v-for="element of elements" :key="element.code" :node="element" />
	</div>
</template>

<style lang="scss" scoped>
.previewer::v-deep {
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;
}
</style>