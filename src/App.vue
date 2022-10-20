<script setup>
import { ref } from 'vue'

import TheEditor from './components/TheEditor.vue'
import ThePreviewer from './components/ThePreviewer.vue'

// JSON
const json = ref('')
// Error
const error = ref('')

// Preview element
const preview = ref(null)

function showPreview() {
	error.value = ''
	
	// Update json
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
		<TheEditor v-model="json" placeholder="Введите JSON объект" />
		<button @click="showPreview" class="button button__accent">Показать</button>
	</div>
	<!-- Result -->
	<div class="container container__result">
		<h1>Форма</h1>
		<ThePreviewer ref="preview" @error="error = $event" :value="previewJson" />
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

	button {
		margin-top: var(--spacing-2);
	}
}
.container__result {
	width: 100%;
	max-width: calc(var(--spacing-basis) * 72);
}
</style>