<script lang="ts">
	export let data: { name: string; data: Array<Array<any>> };
	let HEADERS: Array<string> = data.data[0];
	let DATA: Array<any> = data.data
		.filter((_: any, i: any) => i != 0)
		.map((i: any) => {
			return [false, ...i];
		})
		.splice(0, 100);
	for (let i = 0; i < DATA.length; i++) {
		DATA[i][4] = DATA[i][4] === 'Easy' ? 'A' : DATA[i][4] === 'Medium' ? 'B' : 'C';
	}
	$: COMPLETE = DATA.filter((i) => i[0]).length;
	const sortId = [...Array(HEADERS.length)].map((_) => 0);
	let previous = -1;
	const sortTable = (columnIndex: number) => {
		if (previous != -1 && previous != columnIndex) {
			sortId[previous] = 0;
		}
		sortId[columnIndex] = (sortId[columnIndex] + 1) % 2;
		const SORT_ID = sortId[columnIndex] === 1 ? 'ASC' : 'DESC';
		DATA = DATA.slice().sort((a, b) => {
			const aValue = a[columnIndex];
			const bValue = b[columnIndex];

			if (columnIndex == 0) {
				if (SORT_ID === 'DESC') return aValue - bValue;
				return bValue - aValue;
			} else if (columnIndex === 1 || columnIndex === 5) {
				// @ts-ignore
				if (SORT_ID === 'ASC') return aValue - bValue;
				// @ts-ignore
				return bValue - aValue;
			} else if (columnIndex === 3) {
				if (SORT_ID === 'ASC') return parseFloat(aValue) - parseFloat(bValue);
				return parseFloat(bValue) - parseFloat(aValue);
			} else {
				if (SORT_ID === 'ASC') return aValue.localeCompare(bValue);
				return bValue.localeCompare(aValue);
			}
		});
	};
</script>

<div class="font-bold text-[20px]">
	{data.name} - {COMPLETE}/{DATA.length}
</div>

<table>
	<thead>
		<tr>
			{#each ['PROGRESS', ...HEADERS] as header, idx (header)}
				<th>
					<div class="w-full flex flex-row justify-between">
						{header}
						<div class="pl-2 cursor-pointer" aria-hidden="true" on:click={() => sortTable(idx)}>
							{sortId[idx] == 1 ? '🔽' : '🔼'}
						</div>
					</div></th
				>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each DATA as row, rowIdx}
			<tr class="w-full h-full {DATA[rowIdx][0] ? 'bg-green-200' : ''}">
				{#each row as cell, idx (cell)}
					{#if idx == 0}
						<td>
							<div
								aria-hidden="true"
								on:click={() => {
									DATA[rowIdx][0] = !DATA[rowIdx][0];
								}}
							>
								{cell ? '✅' : '❌'}
							</div>
						</td>
					{:else if idx == 4}
						<td>
							{cell === 'A' ? 'Easy' : cell === 'B' ? 'Medium' : 'Hard'}
						</td>
					{:else if idx == 5}
						<td>
							{cell.slice(0, 4)}
						</td>
					{:else}
						<td>{cell}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
