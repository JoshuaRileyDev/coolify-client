import { z } from 'zod';
export declare const CoolifyConfigSchema: z.ZodObject<{
    apiUrl: z.ZodString;
    apiToken: z.ZodString;
    teamId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    apiUrl: string;
    apiToken: string;
    teamId?: string | undefined;
}, {
    apiUrl: string;
    apiToken: string;
    teamId?: string | undefined;
}>;
export type CoolifyConfig = z.infer<typeof CoolifyConfigSchema>;
export interface Application {
    id: string;
    name: string;
    description?: string;
    fqdn?: string;
    git_repository?: string;
    git_branch?: string;
    build_pack?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface CreatePrivateGithubAppApplicationRequest {
    project_uuid: string;
    server_uuid: string;
    github_app_uuid: string;
    git_repository: string;
    git_branch: string;
    name: string;
    domains?: string;
    ports_exposes?: string;
    ports_mappings?: string;
    base_directory?: string;
    build_pack?: string;
    static_image?: string;
    install_command?: string;
    build_command?: string;
    start_command?: string;
    custom_labels?: string;
    custom_docker_run_options?: string;
    redirect?: string;
    instant_deploy?: boolean;
    dockerfile?: string;
    docker_registry_image_name?: string;
    docker_registry_image_tag?: string;
    docker_compose_location?: string;
    docker_compose_raw?: string;
    docker_compose_custom_start_command?: string;
    docker_compose_custom_build_command?: string;
    docker_compose_domains?: string;
    watch_paths?: string;
    nixpacks_plan?: string;
    nixpacks_build_cmd?: string;
    nixpacks_start_cmd?: string;
    custom_nginx_configuration?: string;
    custom_healthcheck_found?: boolean;
    manual_webhook_secret_github?: string;
    manual_webhook_secret_gitlab?: string;
    manual_webhook_secret_bitbucket?: string;
    manual_webhook_secret_gitea?: string;
    environment_name?: string;
    is_container_label_readonly_enabled?: boolean;
    is_container_label_escape_enabled?: boolean;
}
export interface CreatePrivateGithubAppApplicationResponse {
    uuid: string;
}
export interface Database {
    id: string;
    name: string;
    type: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Server {
    id: string;
    name: string;
    description?: string;
    ip: string;
    port?: number;
    user?: string;
    private_key_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Project {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}
export interface Deployment {
    id: string;
    application_id: string;
    status: string;
    commit_sha?: string;
    created_at: string;
    updated_at: string;
}
export interface Service {
    id: string;
    name: string;
    description?: string;
    docker_compose?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}
export interface Team {
    id: string;
    name: string;
    description?: string;
    personal_team: boolean;
    created_at: string;
    updated_at: string;
}
export interface CoolifyApiResponse<T> {
    data?: T;
    message?: string;
    success?: boolean;
}
export interface ListResponse<T> {
    data: T[];
    links?: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
    meta?: {
        current_page: number;
        from?: number;
        last_page: number;
        per_page: number;
        to?: number;
        total: number;
    };
}
//# sourceMappingURL=types.d.ts.map