# blender-model-viewer

Blenderで作成した3Dモデルを Google の [`<model-viewer>`](https://github.com/google/model-viewer) でWeb表示する静的サイト（GitHub Pages 公開）。

## 応答ルール

- 日本語で応答すること

## 開発コマンド

ビルド・パッケージ管理・リント・テストは一切なし。プレーンなHTMLをそのまま配信する。

```bash
python3 -m http.server 8000   # ローカルプレビュー → http://localhost:8000/
```

※ 各HTMLの `<model-viewer>` の `src` は GitHub Pages の絶対URL（`https://unsolublesugar.github.io/blender-model-viewer/...`）を指しているため、ローカルプレビューでもモデルは公開サイトから読み込まれる。

## 構成概要

- **トップページ**: `index.html`（デスクチェアモデルを表示。アセットはリポジトリ直下の `desk_chair.gltf` / `.glb`）
- **追加モデル**: `models/<name>/index.html` ＋ 同ディレクトリに `.gltf` アセット（例: `models/amongus/`）
- **デプロイ**: GitHub Pages（main ブランチをそのまま公開）
- **公開URL**: <https://unsolublesugar.github.io/blender-model-viewer/>

## モデル追加ワークフロー

1. `models/<name>/` を作成し、`.gltf` ファイルを配置
2. 既存のモデルページ（例: `models/amongus/index.html`）をコピーして `index.html` を作成
3. `<title>`・`alt`・`src`（GitHub Pages の絶対URL）を新モデルに合わせて更新
4. Git push → GitHub Pages に自動反映
