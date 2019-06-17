export const copy = function(text) {
    const textArea = document.createElement('textarea')

    textArea.style.position = 'fixed'
    textArea.style.top = 0
    textArea.style.left = 0
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = 0
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = text

    document.body.appendChild(textArea)

    textArea.select()

    let msg = ''
    let error = null
    try {
        msg = document.execCommand('copy') ? '成功' : '失败'
    } catch (err) {
        error = err
    } finally {
        document.body.removeChild(textArea)
    }

    return {
        error,
        msg
    }
}
