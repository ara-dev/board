<template>
  <a href="#" :id="`${prefixCls}-logo`">
    <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1106:2601)">
        <path
          d="M8.65568 1.50458C4.50956 1.50458 1.14258 4.71625 1.14258 8.67113V36.7003C1.14258 41.3984 5.14956 45.2471 10.1026 45.2471H17.1149C22.8471 45.2471 27.5219 40.7879 27.5219 35.3201V20.0845H47.0003V19.1024C47.0003 9.41433 38.7359 1.53112 28.5793 1.53112H8.65568V1.50458Z"
          fill="#2DA771"
        />
        <path
          d="M40.0716 26.5875H15.5566C15.5566 22.9512 18.6454 20.0049 22.4576 20.0049H46.9725C46.9725 23.6413 43.8838 26.5875 40.0716 26.5875Z"
          fill="url(#paint0_linear_1106:2601)"
        />
      </g>
      <path
        opacity="0.35"
        d="M15.5 17C12.475 17 10 14.525 10 11.5C10 8.475 12.475 6 15.5 6C18.525 6 21 8.475 21 11.5C21 14.525 18.525 17 15.5 17Z"
        fill="#060A00"
      />
      <path
        opacity="0.35"
        d="M16 15C18.2091 15 20 13.433 20 11.5C20 9.567 18.2091 8 16 8C13.7909 8 12 9.567 12 11.5C12 13.433 13.7909 15 16 15Z"
        fill="#060A00"
      />
      <defs>
        <filter
          id="filter0_d_1106:2601"
          x="0.142578"
          y="0.504578"
          width="47.8574"
          height="45.7425"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1106:2601" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1106:2601"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1106:2601"
          x1="31.2646"
          y1="20.0049"
          x2="31.2646"
          y2="26.5875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFD100" />
          <stop offset="1" stop-color="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  </a>
</template>

<script lang="ts" setup>
  import { useDesign } from '../utils/useDesign'

  const { prefixCls } = useDesign('logo')
</script>

<style scoped lang="less">
  @pre : ~'@{namespace}-logo';
  #@{pre}-logo{
    width: @cp-side-width*0.6;
    height: @cp-side-width*0.6;
    position: absolute;
    bottom: @cp-side-width*0.2;
    right: @cp-side-width*0.2;
  }
</style>
