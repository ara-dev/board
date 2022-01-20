<template>
  <div>
    <div
      v-for="(item, index) in elements"
      :key="index"
      class="layer-item select-none"
      :class="[{ active: isActiveItem(item) }]"
      :style="getMargin(item)"
      @click="selectElement(item)"
    >
      <span @click.stop="toggleExpand(item)">
        <Icon :icon="getExpandIcon(item.name)" />
      </span>
      <span class="ant-tag mr-0">
        <Icon :icon="getIcon(item.name)" />
        {{ getText(item.name) }}</span
      >
      {{ getId(item.name) }}
      <span class="flex-1"></span>

      <span @click.stop="visible(item)" v-if="!item.hidden">
        <Icon :icon="getVisibleIcon(item)" />
      </span>
      <span v-else @click.stop="visible(item)">show</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../../../core/store/stage'
  import { computed, ref, toRaw } from 'vue'
  import { get, isArray, isBoolean, set } from 'lodash-es'

  const expandKeys = ref<Set<string>>(new Set())
  const filterModel = ref<string[]>([])
  const elements = computed(() => {
    const a = stageStore._state.pages.map((page) => flattenLayers(page.stage))
    return (
      a[0]?.filter((i) => {
        const ii = i.prefix.split('.')
        ii.pop()
        let isHide = false
        for (const y of expandKeys.value) {
          if (ii.join('.').startsWith(y)) {
            isHide = true
            break
          }
        }
        return !['transformer', 'anchor'].includes(i.name) && !isHide
      }) ?? []
    )
  })

  const treeData = computed(() => {
    if (!elements.value) return
    function appendInObject(name, prefix, data) {
      set(r, `${prefix}_prv`, data)
    }
    const t = elements.value
    const r = {}
    t?.forEach((item) => {
      appendInObject(item.name, item.prefix, item)
    })
    console.log('objectToArrayTree(r) ===>', objectToArrayTree(r))
    return objectToArrayTree(r)
  })

  function objectToArrayTree(obj: Object) {
    const keys = Object.keys(obj).filter((key) => !key.startsWith('_'))
    const result: any[] = []
    keys.forEach((key) => {
      result.push({
        key: key,
        title: key,
        data: obj._prv,
        children: objectToArrayTree(obj[key]),
      })
    })
    return result
  }

  function generateTreeData() {
    return elements.value
  }

  function getExpandIcon(name: string) {
    console.log('name ===>', name)
    console.log('expandKeys.value ===>', expandKeys.value)
    return expandKeys.value.has(name) ? 'tabler:caret-left' : 'tabler:caret-down'
  }

  function toggleExpand(item) {
    const key = item.prefix + item.name
    if (expandKeys.value.has(key)) {
      expandKeys.value.delete(key)
    } else {
      expandKeys.value.add(key)
    }
  }

  function getMargin(item) {
    const l = item.prefix.split('.').length - 1
    return {
      'margin-right': `${l * 5}px`,
    }
  }

  function flattenLayers(layer: any, prefix = '') {
    let child: any[] = []
    if (isArray(layer.children)) {
      layer.children.forEach((l: any) => {
        child = child.concat(toRaw(flattenLayers(l, `${prefix}${layer.name()}.`)))
      })
    }
    return [{ ...toRaw(layer.attrs), prefix }].concat(child)
  }

  function selectElement(item) {
    const elm = stageStore.findNestedNode(stageStore._state.pages[0].stage, item.name)
    stageStore.setActiveElement(elm, stageStore._state.pages[0].stage)
  }

  const map = {
    path: 'tabler:route',
    group: 'ion:folder-open-outline',
    text: 'tabler:letter-t',
    line: 'tabler:letter-i',
    polygon: 'tabler:hexagon',
  }
  const mapText = {
    path: 'مسیر',
    group: 'گروه',
    text: 'نوشته',
    line: 'خط',
    polygon: 'چند ضلعی',
  }

  const filterOptions = [
    {
      key: 'all',
      value: 'all',
      label: 'همه',
    },
    {
      key: 'text',
      value: 'text',
      label: 'نوشته',
    },
    {
      key: 'group',
      value: 'group',
      label: 'گروه',
    },
    {
      key: 'path',
      value: 'path',
      label: 'مسیر',
    },
    {
      key: 'line',
      value: 'line',
      label: 'خط',
    },
    {
      key: 'polygon',
      value: 'polygon',
      label: 'چند ضلعی',
    },
  ]
  function getIcon(name = '_._._') {
    return get(map, name.split('_')[1], 'tabler:circle')
  }

  function getText(name = '_._._') {
    return get(mapText, name.split('_')[1], name.split('_')[1])
  }

  function getVisibleIcon(item: any) {
    if (!isBoolean(item.hidden)) return 'tabler:eye'
    return item.hidden ? 'tabler:eye-off' : 'tabler:eye'
  }

  function getId(name = '_._._') {
    return get(name.split('_'), '2', '-')
  }

  function visible(item: any) {
    generateTreeData()
    const elm = stageStore.findNestedNode(stageStore._state.pages[0].stage, item.name)
    if (elm) {
      elm.visible(!elm.visible())
    }
    item.hidden = !elm.visible()
  }

  function isActiveItem(item: any) {
    return (
      stageStore._state?.selectedElements?.map((i) => get(i, 'attrs.name')).includes(item.name) ??
      false
    )
  }
</script>

<style lang="less">
  .layer-item {
    padding: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    &:hover,
    &.active {
      border-color: @primary-color;
    }

    &.active {
      .ant-tag {
        background-color: @primary-color;
        color: white;
      }
    }
  }
</style>
