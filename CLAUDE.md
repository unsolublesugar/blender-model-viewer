# blender-model-viewer

Blenderで作成した3Dモデルを Google の [`<model-viewer>`](https://github.com/google/model-viewer) でWeb表示する静的サイト（GitHub Pages 公開）。

## 応答ルール

- 日本語で応答すること

## 開発コマンド

ビルド・パッケージ管理・リント・テストは一切なし。プレーンなHTMLをそのまま配信する。

```bash
python3 -m http.server 8000   # ローカルプレビュー → http://localhost:8000/
```

モデルの `src` は相対パスのため、ローカルプレビューでも手元のモデルファイルが読み込まれる。

## 構成概要

- **ライブラリ**: `@google/model-viewer` を unpkg からバージョン固定で読み込み（更新時は各HTMLの `@x.y.z` を書き換える）
- **トップページ**: `index.html`（デスクチェアモデル。アセットはリポジトリ直下の `desk_chair.glb`）
- **`desk_chair.gltf` は削除禁止**: サイト内では未使用だが、外部ブログ記事（synamon.hatenablog.com/entry/blender-introduction）の埋め込みmodel-viewerがこのURLを直接参照している
- **追加モデル**: `models/<name>/index.html` ＋ 同ディレクトリにモデルアセット（例: `models/amongus/`）
- **付随画像**: 各ページに `poster.webp`（読み込み中表示）と `og.png`（OGP用 1200×630）を同梱
- **デプロイ**: GitHub Pages（main ブランチをそのまま公開）
- **公開URL**: <https://unsolublesugar.github.io/blender-model-viewer/>

## モデル追加ワークフロー

1. `models/<name>/` を作成し、`.glb`（推奨）または `.gltf` ファイルを配置
2. 既存のモデルページ（例: `models/amongus/index.html`）をコピーして `index.html` を作成
3. `<title>`・OGPメタタグ・`alt`・`src`（相対パス）を新モデルに合わせて更新
4. `poster.webp` / `og.png` を生成して配置（ローカルサーバー起動中にヘッドレスChromeで実描画からキャプチャ）
5. Git push → GitHub Pages に自動反映
