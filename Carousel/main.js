var allButtons = $('#buttons > span')

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    var index = $(x.currentTarget).index()
    var p = index * -300
    $('#images').css({
      transform: 'translate(' + p + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n))
  })
}



var n = 0;
var size = allButtons.length
palySlide(n % size)


var timerId = setTimer()
function setTimer() {
  return setInterval(() => {
    n += 1
    palySlide(n % size)
  }, 1000)
}
function palySlide(index){
  allButtons.eq(index).trigger('click')
}

function activeButton($button) {
  $button
    .addClass('red')
    .siblings('.red').removeClass('red')
}

$('.window').on('mouseenter', function() {
  window.clearInterval(timerId)
})

$('.window').on('mouseleave', function() {
  timerId = setTimer()
})