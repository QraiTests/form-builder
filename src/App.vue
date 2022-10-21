<script setup>
import { ref } from 'vue'

import ThePreviewer from './components/ThePreviewer.vue'

// JSON
const json = ref('')
// Error
const error = ref('')

// Preview element
const preview = ref(null)

function showPreview() {
	// Erase error
	error.value = ''
	
	// Update form
	preview.value.build(json.value)
}
</script>

<template>
	<!-- Builder -->
	<div class="container container__builder">
		<h1>Конструктор форм</h1>
		<div v-if="error.length > 0" class="alert alert__error">
			{{ error }}
		</div>
		<textarea class="editor" v-model="json" placeholder="Введите JSON объект"></textarea>
		<button @click="showPreview" class="button button__accent">Показать</button>
	</div>
	<!-- Result -->
	<div class="container container__result">
		<h1>Форма</h1>
		<ThePreviewer ref="preview" @error="error = $event" />
	</div>
</template>

<style lang="scss" scoped>
h1 {
	margin-bottom: var(--spacing-2);
}

.container__builder {
	width: 100%;
	max-width: calc(var(--spacing-basis) * 72);

	margin-top: calc(var(--spacing-basis) * 20);
	margin-bottom: var(--spacing-2);

	.editor {
		width: 100%;
		height: calc(var(--spacing-basis) * 16);

		background-color: var(--color-2);
	}

	button {
		margin-top: var(--spacing-2);
	}
}
.container__result {
	width: 100%;
	max-width: calc(var(--spacing-basis) * 72);
}
</style>