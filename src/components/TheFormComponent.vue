<script setup>
import { defineProps, toRefs } from 'vue'

import { Node } from '@/core/Node'

// Properties
const props = defineProps({
	node: {
		required: true,
		validator: (val) => val instanceof Node
	},
})
// Emits
const { node } = toRefs(props)
</script>

<template>
	<!-- Container -->
	<div v-if="node.type === 'container'" :id="node.code">
		<TheFormComponent v-for="child of node.children" :key="child.code" :node="child" />
	</div>
	<!-- Input -->
	<input v-else-if="node.type === 'input'" :id="node.code" type="text" placeholder="Введите текст">
	<!-- Date picker -->
	<input v-else-if="node.type === 'datepicker'" :id="node.code" type="date">
	<!-- List (select) -->
	<select v-else-if="node.type === 'list'" :id="node.code">
		<option v-for="option of node.listdata" :key="option.key" :value="option.key">
			{{ option.value }}
		</option>
	</select>

	<div v-else class="alert alert__error">
		<span>Неизвестный компонент</span>
	</div>
</template>

<style scoped lang="scss">
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
</style>