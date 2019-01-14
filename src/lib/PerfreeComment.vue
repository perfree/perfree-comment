<!-- 评论框插件 -->
<template>
  <div style="padding: 14px;">
    <div class="perfree-eidtor-input-box">
      <div contenteditable="true" v-bind:style="{minHeight: minHeight}" spellcheck="false" @input="setFontNumber" v-on:keyup.enter="watchEnter" id="perfreeEdit"></div>
      <div class="perfree-eidtor-tools-box">
				<a href="javascript:;" class="perfree-editor-emjoi">
					<img src="../assets/emjoi.svg" width="25px" height="25px">
					<span>表情</span>
				</a>
        <a href="javascript:;" class="perfree-editor-image" @click="uploadImg">
					<img src="../assets/image.svg" width="25px" height="25px">
					<span>图片</span>
				</a>
        <input type="file" style="display: none" id="uploadFile" @change="showImg">
        <Button type="info" class="perfree-eidtor-submit-btn" @click="submitval">{{btnMessage}}</Button>
				<!-- 表情面板start -->
				<div class="emjoi-panel-box">
					<emjoi-icon v-on:selectEmjoi="addEmjoi"></emjoi-icon>
				</div>
				<!-- 表情面板end -->
        <!-- image面板 -->
        <div class="upload-image-box" v-if="imageList.length > 0">
         <div class="image-show-box" v-for="(image,index) in imageList" :key="index">
           <img :src="image" width="100px" height="100px" @mouseover="showdelete">
           <a href="javascript:;" class="delete-img" @mouseout="hideDelete" @click="deleteImg(index)"><Icon type="ios-trash" size="26"/></a>
         </div>
          <a href="javascript:;" @click="uploadImg" class="upload-image-upload" id="uploadImgBtn">
            +
          </a>
        </div>
        <span class="font-number-show" v-bind:style="{ color: fontNumberColor}">{{fontNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import EmjoiIcon from './EmjoiIcon'
export default {
  name: 'perfree-comment',
  components: {
    EmjoiIcon
  },
  props: ['minHeight', 'btnMessage'],
  data () {
    return {
      fontNumber: 1000,
      emjoiNumber: 0,
      activitiesVal: '',
      fontNumberColor: '#c5c8ce',
      imageList: []
    }
  },
  methods: {
    /* 当用户输入时,动态变更字数信息,将内容赋值给activitiesVal */
    setFontNumber: function ($event) {
      /* 获取文字内容赋值 */
      this.activitiesVal = $event.target.innerText
      /* 计算剩余字数 */
      this.fontNumber = 1000 - this.activitiesVal.length - ($('#perfreeEdit > img').length) * 2
      /* 给剩余字数选择颜色 */
      if (this.fontNumber <= 0) {
        this.fontNumberColor = 'red'
      } else {
        this.fontNumberColor = '#c5c8ce'
      }
      /* 移动光标,设置5毫秒之后 */
      setTimeout(() => {
        this.keepLastIndex($event.target)
      }, 5)
    },
    /* 移动光标位置 */
    keepLastIndex: function (obj) {
      if (window.getSelection) {
        obj.focus()
        let range = window.getSelection()
        range.selectAllChildren(obj)
        range.collapseToEnd()
      } else if (document.selection) {
        let range = document.selection.createRange()
        range.moveToElementText(obj)
        range.collapse(false)
        range.select()
      }
    },
    /* 监听回车键 */
    watchEnter: function () {
      console.log($('#perfreeEdit').html())
      console.log($('#perfreeEdit > img').length)
    },
    /* 向输入框添加emjoi */
    addEmjoi: function (data) {
      $('#perfreeEdit').focus()
      this.insertHtmlAtCaret(data.outerHTML)
      this.emjoiNumber += 2
      this.fontNumber = 1000 - this.activitiesVal.length - this.emjoiNumber
    },
    /* 向编辑框插入html */
    insertHtmlAtCaret: function (html) {
      let sel, range
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0)
          range.deleteContents()
          let el = document.createElement('div')
          el.innerHTML = html
          let frag = document.createDocumentFragment()
          let node, lastNode
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node)
          }
          range.insertNode(frag)
          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange()
            range.setStartAfter(lastNode)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
          }
        }
      } else {
        if (document.selection && document.selection.type !== 'Control') {
          document.selection.createRange().pasteHTML(html)
        }
      }
    },
    /* 上传图片按钮点击事件 */
    uploadImg: function () {
      $('#uploadFile').click()
    },
    /* 上传图片,以base64展示图片 */
    showImg: function ($event) {
      let file = $event.target.files[0]
      // 判断是否是图片类型
      if (!/image\/\w+/.test(file.type)) {
        this.$Message.error('图片格式不正确')
        return false
      }
      if (this.imageList.length >= 6) {
        this.$Message.error('最多只能上传6张图片哦')
        return false
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      let that = this
      reader.onload = function (e) {
        that.imageList.push(this.result)
        let file = document.getElementById('uploadFile')
        file.value = ''
        if (that.imageList.length === 6) {
          $('#uploadImgBtn').css('display', 'none')
        }
      }
    },
    /* 显示删除按钮 */
    showdelete: function (e) {
      e.currentTarget.nextElementSibling.style.display = 'block'
    },
    /* 隐藏删除按钮 */
    hideDelete: function (e) {
      e.currentTarget.style.display = 'none'
    },
    /* 删除图片 */
    deleteImg: function (index) {
      this.imageList.splice(index, 1)
      $('#uploadImgBtn').css('display', 'block')
    },
    /* 点击发布事件,向父组件传值 */
    submitval: function () {
      let editVal = {
        message: $('#perfreeEdit').html(),
        image: this.imageList
      }
      this.$emit('editVal', editVal)
    },
    /* 清空编辑器 */
    clearEdit: function () {
      this.imageList = []
      this.activitiesVal = ''
      $('#perfreeEdit').empty()
    }
  }
}
</script>

<style>
.perfree-eidtor-input-box{
  width: 100%;
	position: relative;
}
#perfreeEdit{
  width: 100%;
  resize: inherit;
  border: 1px solid #e8eaec;
}
.perfree-eidtor-tools-box{
  margin-top: 6px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.font-number-show{
  position: absolute;
	bottom: 32px;
	right: 5px;
}
.emjoi-panel-box{
	width: 276px;
	z-index: 101;
	position: absolute;
	background-color: #fff;
	background-clip: padding-box;
	border-radius: 4px;
	box-shadow: 0 1px 6px rgba(0,0,0,.2);
	white-space: nowrap;
}
.perfree-editor-emjoi,.perfree-editor-image{
	text-decoration: none;
	color: #2db7f5;
	display: block;
}
.perfree-editor-image{
  margin-left: 6px;
}
.perfree-eidtor-submit-btn{
  float: right;
  width: 88px;
  height: 30px;
  border-radius: 0px;
	border: none;
	background-color: #2db7f5;
	color: white;
	cursor: pointer;
}
.perfree-eidtor-submit-btn:hover{
  box-shadow: none;
}
.upload-image-box{
  width: 324px;
  z-index: 100;
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  white-space: nowrap;
  padding-left: 4px;
  padding-bottom: 8px;
  padding-top: 4px;
}
.upload-image-box .image-show-box{
  width: 100px;
  height: 100px;
  float: left;
  margin-left: 4px;
  margin-top: 4px;
  position: relative;
}
.upload-image-box .image-show-box .delete-img{
  position: absolute;
  z-index: 43;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 100px;
  color: red;
  display: none;
}
.upload-image-box .upload-image-upload{
  float: left;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 2px dashed #e8eaec;
  margin-left: 4px;
  margin-top: 4px;
}
</style>
