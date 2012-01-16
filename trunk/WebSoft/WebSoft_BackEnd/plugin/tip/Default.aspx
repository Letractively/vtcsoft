<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>jTip - The Jquery Tool Tip</title>

<style type="text/css" media="all">
@import "/plugin/tip/css/global.css";
</style>
<script src="/plugin/tip/js/jquery-1.5.1.min.js" type="text/javascript"></script>
<script src="/plugin/tip/js/jtip.js" type="text/javascript"></script>

</head>
<body>
<div id="contentPad">

<!--<input type="text" tipOpt="ID chứa nội dung, chiều rộng, ID element vị trí hiển thị, tiêu đề nếu có" id="abc" class="jTipHover hoặc jTipFocus" />-->

<input type="text" tipOpt="abc123,200,inLoca" class="jTipHover" value="Hover here" />
<br />
<input type="text" tipOpt="abc123,100" class="jTipFocus" value="Focus here" />
<br />
<input type="text" id="inLoca" value="location" />
<div style="float:right;margin-right:150px;">
<a href="#" tipOpt="abc123,200,inLoca" id="Text1" class="jTipHover">Hover here</a>
<br />
<a href="#" tipOpt="abc123" id="A3" class="jTipHover">Hover here</a>
</div>
<br />

<br />
<a href="#" tipOpt="abc123" id="A2" class="jTipHover">Hover here</a>
<br />

<a href="#" tipOpt="abc123, 200" id="A1" class="jTipFocus">Focus here</a>

<div id="abc123" style="display:none"> Nội dung </div>
</body>
</html>
