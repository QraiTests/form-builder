<script setup>
import { defineProps, defineEmits, toRefs, watch } from 'vue'

// Properties
const props = defineProps({
	value: {
		type: String,
		default: ''
	},
})
// Emits
const emit = defineEmits(['update:value'])

// Watch value & emit
const { value } = toRefs(props)
watch(value, () => {
	emit('update:value', value)
})
</script>

<template>
	<textarea class="editor" v-model="text"></textarea>
</template>

<style lang="scss" scoped>
.editor {
	width: 100%;
	height: calc(var(--spacing-basis) * 16);

	background-color: var(--color-2);
}
</style>