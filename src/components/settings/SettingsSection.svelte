<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<div
    id="{title}-provider-settings-section"
    class="w-full pb-2 mb-4 border-b">
    <h2 class="text-lg font-bold text-gray-800">{title}</h2>
    <p class="text-sm text-gray-600">{description}</p>    
</div>
<div class="mb-8">
    <slot />
</div>
