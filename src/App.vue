<template>
  <div class="h-screen">
    <!-- START TOPBAR -->
    <div class="w-full p-3 topbar">
      <a-button @click="visible=!visible">ذخیره و ادامه</a-button>
    </div>
    <!-- END TOPBAR -->

    <!-- START MAIN -->
    <div class="main">
      <div class="grid grid-cols-12" style="height: 100%">

        <!-- START CONFIG TOOLBAR -->
        <div class="col-span-2 border-r border-gray-300 pr-3 pt-3 max-h-full overflow-auto config-tool" dir="rtl">
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />


          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
              </svg>
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>

          <a-divider />



         <!-- <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
            &lt;!&ndash;<a-tab-pane key="3" tab="Tab 3" force-render>Content of Tab Pane 3</a-tab-pane>&ndash;&gt;
          </a-tabs>-->

        </div>
        <!-- END CONFIG TOOLBAR -->

        <!-- START MAIN BOARD -->
        <div class="col-span-7 main-board p-2 overflow-auto max-h-full">
             <!-- <solid :value="colors" />-->
         <!-- <div class="main-footer">
            dfsdfsdfsd
          </div>-->
          <div style="relative ">
            <div class="absolute">
              <a-button-group class="mr-3">
                <a-button>
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
                  </svg>
                </a-button>
                <a-button>
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z" />
                  </svg>
                </a-button>
              </a-button-group>
            </div>
            <div class="bottom-board absolute bottom-4">
              <a-button-group class="mr-3">
                <a-button>
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z" />
                  </svg>
                </a-button>
                <a-button>
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z" />
                  </svg>
                </a-button>
              </a-button-group>

              <a-button-group class="mr-3">
                <a-button>
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z" />
                  </svg>
                </a-button>
                <a-button>
                  100%
                </a-button>
              </a-button-group>

              <a-button-group>
                <a-button>
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,3H10A2,2 0 0,1 12,1A2,2 0 0,1 14,3H22V5H21V16H15.25L17,22H15L13.25,16H10.75L9,22H7L8.75,16H3V5H2V3M5,5V14H19V5H5Z" />
                  </svg>
                </a-button>
                <!-- <a-button>
                   100%
                 </a-button>-->
              </a-button-group>
              <!--
                            <a-button>
                              100%
                            </a-button>-->

            </div>
            <div class="">
              <pre>
                fsdfggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
                g
                fdg
                dg
                dfg
                df
                gdf
                gdf
                gd
                fg
                dfg
                d
                g
                dfg
                d
                g
                df
                gdf
                g
                df
                g
                df
                gd
                g

                g
                df
                gd
                fg
                dfg
                d
                g
                d
                gdf
                gdf
                g
              </pre>
            </div>
          </div>
        </div>
        <!-- END BOARD -->

        <!-- START TOOLBAR  -->
        <div class="col-span-3 border-l border-gray-300 toolbar-menu">
            <div class="grid grid-cols-12 " style="height: 100%;">
              <div class="col-span-9">
               <div class="overflow-auto max-h-full">
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />


                 <p class="text-xs font-bold">قرارگیری</p>
                 <div class="flex mt-6">
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z" />
                     </svg>
                     <span class="text-xs">رویی</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z" />
                     </svg>
                     <span class="text-xs">زیرین</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z" />
                     </svg>
                     <span class="text-xs">برو زیر</span>
                   </div>
                   <div class="flex-1">
                     <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                       <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z" />
                     </svg>
                     <span class="text-xs">بیار رو</span>
                   </div>
                 </div>

                 <a-divider />
               </div>
              </div>
              <!---->
              <div class="col-span-3 border-l	border-gray-300" >
                <div class="flex flex-col">
                  <tool-bar-item :selected="true" title="تصاویر" >
                     <svg viewBox="0 0 24 24" width="24" height="24" class="ml-6">
                        <path class="icon-color" d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" />
                      </svg>
                  </tool-bar-item>
                  <tool-bar-item :selected="false" title="متن" >
                    <svg viewBox="0 0 24 24" width="24" height="24" class="ml-6">
                      <!--<path class="icon-color" d="M21,7V3H17V4H7V3H3V7H4V17H3V21H7V20H17V21H21V17H20V7H21M18,4H20V6H18V4M4,4H6V6H4V4M6,20H4V18H6V20M20,20H18V18H20V20M18,17H17V18H7V17H6V7H7V6H17V7H18V17M16,8V10H13V16H11V10H8V8H16Z" />-->
                      <path class="icon-color" d="M2 4C2 2.9 2.9 2 4 2H8V4H4V8H2V4M22 20C22 21.11 21.11 22 20 22H16V20H20V16H22V20M4 22C2.9 22 2 21.11 2 20V16H4V20H8V22H4M20 2C21.11 2 22 2.9 22 4V8H20V4H16V2H20M9 7V9H11V17H13V9H15V7H9Z" />
                    </svg>
                  </tool-bar-item>
                  <tool-bar-item :selected="false" title="استیکر" >
                    <svg viewBox="0 0 24 24" width="24" height="24" class="ml-6">
                      <path class="icon-color" d="M2,2H11V11H2V2M17.5,2C20,2 22,4 22,6.5C22,9 20,11 17.5,11C15,11 13,9 13,6.5C13,4 15,2 17.5,2M6.5,14L11,22H2L6.5,14M19,17H22V19H19V22H17V19H14V17H17V14H19V17Z" />
                    </svg>
                  </tool-bar-item>

                  <tool-bar-item :selected="true" title="چارچوب ها" >
                    <svg viewBox="0 0 24 24" width="24" height="24" class="ml-6">
                      <path class="icon-color" d="M3 21H11V13H3M5 15H9V19H5M3 11H11V3H3M5 5H9V9H5M13 3V11H21V3M19 9H15V5H19M18 16H21V18H18V21H16V18H13V16H16V13H18Z" />
                    </svg>
                  </tool-bar-item>
                  <tool-bar-item :selected="false" title="پس زمینه" >
                    <svg viewBox="0 0 24 24" width="24" height="24" class="ml-6">
                      <path class="icon-color" d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" />
                    </svg>
                  </tool-bar-item>
                </div>
              </div>
            </div>
        </div>
        <!-- END TOOLBAR  -->

      </div>
    </div>
    <!-- END MAIN -->
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import ToolBarItem from "./components/ToolBar/ToolBarItem.vue";
import Solid from "./components/ColorPicker/Solid/Solid.vue";
//import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    Solid,
    ToolBarItem
    //HelloWorld
  },
  setup(){

    const activeTab= ref('1');

    //const visible = ref(true);

    /*const onClose = () => {
      //alert('sdfsdfsdfsdf');
      visible.value = !visible.value;
    };*/
    return {
      activeTab,
      //onClose,
      //visible
      /*colors : {
        hex: '#194d33',
        hex8: '#194D33A8',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      }*/
    }

  }

  /*data(){
    retrun {
      age
    }
  }*/
})
</script>

<style lang="less">

.main-footer{
  background: #fff;
}

.toolbar-menu{
  /*background: #42b983;*/
}

.main-board{
  background:#E5E5E5;
}

.tools{
  background:#fff;
}

.config-tool{
  /*background: #fff;*/
  /*height: 200px;*/
  /*overflow: hidden;
  position: relative;
  border: 1px solid #ebedf0;
  borderRadius: 2px;
  padding: 48px;
  textAlign: center;*/
 /* background: #fafafa;*/
  /*width: 100%;*/
}

/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
/*.tttt{
  fill: red;
}*/
</style>
