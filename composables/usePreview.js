import {previewStore} from "~/store/previewStore";
import hjs from "highlight.js";

export default () => ({
    getPreview: function () {
        if (!previewStore().getPreview) return
        hjs.highlightAll()
        return parseMarkdown(previewStore()?.getPreview)
    }
})