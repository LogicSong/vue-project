<script setup>
import { useDateFormat, useNow } from '@vueuse/core';

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
</script>

<template>
  <main>{{ formatted }}</main>
</template>
