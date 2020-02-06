import * as bold from '@components/editor/core/leafs/Bold';
import * as italic from '@components/editor/core/leafs/Italic';
import * as strikethrough from '@components/editor/core/leafs/Strikethrough';
import * as underline from '@components/editor/core/leafs/Underline';

export default {
	[bold.key]: bold,
	[italic.key]: italic,
	[strikethrough.key]: strikethrough,
	[underline.key]: underline,
}